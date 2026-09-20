const { obtenerClima, obtenerResumenWikipedia, distanciaKm } = require("../lib/helpers");

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
    const { ciudad, distanciaMaxKm, palabrasClave, idioma } = req.body || {};

    if (!ciudad || !palabrasClave) {
      res.status(400).json({ error: "Faltan datos: ciudad y palabras clave son obligatorios" });
      return;
    }

    const idiomaCodigo = idioma === "de" ? "de" : "es";

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

    // Google limita el radio a 50 km como máximo
    const limiteKm = Math.min(Math.max(Number(distanciaMaxKm) || 20, 1), 50);

    // Rectángulo real alrededor del origen (locationRestriction, no solo una sugerencia)
    const latDelta = limiteKm / 111;
    const lngDelta = limiteKm / (111 * Math.cos((origen.lat * Math.PI) / 180));
    const rectangulo = {
      low: { latitude: origen.lat - latDelta, longitude: origen.lng - lngDelta },
      high: { latitude: origen.lat + latDelta, longitude: origen.lng + lngDelta },
    };

    // 2) Partimos las palabras clave y buscamos CADA UNA por separado
    //    (igual que cuando vos escribís "museos" y después "parques" en Google Maps)
    const palabras = palabrasClave
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .slice(0, 5); // tope de 5 búsquedas para no disparar el consumo de la API

    const buscarUnaPalabra = async (palabra) => {
      const textoBusqueda =
        idiomaCodigo === "de" ? `${palabra} in ${ciudad}` : `${palabra} en ${ciudad}`;

      const resp = await fetch("https://places.googleapis.com/v1/places:searchText", {
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
          pageSize: 6,
          rankPreference: "DISTANCE",
          locationRestriction: { rectangle: rectangulo },
        }),
      });
      const data = await resp.json();
      if (!resp.ok || data.error) {
        console.error(`Error de Places API buscando "${palabra}":`, JSON.stringify(data));
        return [];
      }
      return data.places || [];
    };

    const resultadosPorPalabra = await Promise.all(palabras.map(buscarUnaPalabra));
    const todosLosPlaces = resultadosPorPalabra.flat();

    // Sacamos duplicados (el mismo lugar puede aparecer en más de una búsqueda)
    const vistos = new Set();
    const placesUnicos = todosLosPlaces.filter((p) => {
      if (vistos.has(p.id)) return false;
      vistos.add(p.id);
      return true;
    });

    // Filtro extra: por si algo se coló más lejos del radio real
    const placesFiltrados = placesUnicos.filter((p) => {
      if (!p.location) return false;
      const d = distanciaKm(origen.lat, origen.lng, p.location.latitude, p.location.longitude);
      return d <= limiteKm;
    });

    if (placesFiltrados.length === 0) {
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
      placesFiltrados.slice(0, 12).map(async (p) => {
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
