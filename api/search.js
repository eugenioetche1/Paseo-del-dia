const { obtenerClima, obtenerResumenWikipedia } = require("../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    res.status(500).json({ error: "Falta configurar GOOGLE_MAPS_API_KEY en Vercel" });
    return;
  }

  try {
    const { ciudad, distanciaMaxKm, palabrasClave, duracion, personas, edadesNinos, priorizarTecho, idioma } =
      req.body || {};

    if (!ciudad || !palabrasClave) {
      res.status(400).json({ error: "Faltan datos: ciudad y palabras clave son obligatorios" });
      return;
    }

    const idiomaCodigo = idioma === "de" ? "de" : "es";

    const DURACION_TEXTOS = {
      es: { rapida: "de una hora", media: "de media jornada", completa: "de el día completo" },
      de: { rapida: "für eine Stunde", media: "für einen halben Tag", completa: "für den ganzen Tag" },
    };
    const duracionTexto = DURACION_TEXTOS[idiomaCodigo][duracion] || "";

    // 1) Geocodificar la ciudad para tener un centro de búsqueda
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      ciudad
    )}&key=${API_KEY}&language=${idiomaCodigo}`;
    const geoResp = await fetch(geoUrl);
    const geoData = await geoResp.json();

    if (!geoData.results || geoData.results.length === 0) {
      res.status(404).json({ error: "No pude encontrar esa ciudad. Probá escribirla de otra forma." });
      return;
    }

    const origen = geoData.results[0].geometry.location; // {lat, lng}

    // 2) Armar el texto de búsqueda a partir de los filtros (en el idioma elegido)
    let textoBusqueda;
    if (idiomaCodigo === "de") {
      textoBusqueda = `${palabrasClave} in der Nähe von ${ciudad}`;
      if (edadesNinos) textoBusqueda += `, geeignet für Kinder im Alter von ${edadesNinos}`;
      if (priorizarTecho) textoBusqueda += `, Aktivitäten drinnen`;
      if (duracionTexto) textoBusqueda += `, ein Ausflug ${duracionTexto}`;
    } else {
      textoBusqueda = `${palabrasClave} cerca de ${ciudad}`;
      if (edadesNinos) textoBusqueda += `, apto para niños de ${edadesNinos} años`;
      if (priorizarTecho) textoBusqueda += `, actividades bajo techo`;
      if (duracionTexto) textoBusqueda += `, un paseo ${duracionTexto}`;
    }

    // Google limita el radio de "locationBias" a 50.000 metros (50 km) como máximo
    const radioMetros = Math.min(Math.max(Number(distanciaMaxKm) || 20, 1), 50) * 1000;

    const searchResp = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.editorialSummary,places.primaryTypeDisplayName,places.googleMapsUri",
      },
      body: JSON.stringify({
        textQuery: textoBusqueda,
        languageCode: idiomaCodigo,
        maxResultCount: 10,
        locationBias: {
          circle: {
            center: { latitude: origen.lat, longitude: origen.lng },
            radius: radioMetros,
          },
        },
      }),
    });

    const searchData = await searchResp.json();

    if (!searchResp.ok || searchData.error) {
      console.error("Error de Places API:", JSON.stringify(searchData));
      res.status(502).json({
        error: `Google respondió con un error: ${searchData.error?.message || searchResp.status}`,
      });
      return;
    }

    if (!searchData.places || searchData.places.length === 0) {
      res.status(200).json({ origen, clima: null, lugares: [] });
      return;
    }

    // 3) Clima actual en la ciudad de origen
    const climaRaw = await obtenerClima(origen.lat, origen.lng);
    const clima = climaRaw
      ? { temperatura: climaRaw.temperature_2m, codigo: climaRaw.weather_code }
      : null;

    // 4) Armar la respuesta con una reseña corta por lugar (con respaldo de Wikipedia si Google no tiene resumen)
    const lugares = await Promise.all(
      searchData.places.map(async (p) => {
        let resena = p.editorialSummary?.text || null;

        if (!resena) {
          resena = await obtenerResumenWikipedia(p.displayName?.text || "", idiomaCodigo);
        }

        if (!resena) {
          const categoria = p.primaryTypeDisplayName?.text;
          resena = categoria
            ? idiomaCodigo === "de"
              ? `${categoria} in der Nähe.`
              : `${categoria} en la zona.`
            : idiomaCodigo === "de"
            ? "Ort von Interesse in der Nähe."
            : "Punto de interés en la zona.";
        }

        return {
          id: p.id,
          nombre: p.displayName?.text || "Sin nombre",
          direccion: p.formattedAddress || "",
          resena,
          rating: p.rating || null,
          totalReseñas: p.userRatingCount || 0,
          lat: p.location?.latitude,
          lng: p.location?.longitude,
        };
      })
    );

    res.status(200).json({ origen, clima, lugares });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ocurrió un error buscando lugares. Probá de nuevo." });
  }
};
