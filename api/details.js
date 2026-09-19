const { distanciaKm, estimarViaje, obtenerClima } = require("../lib/helpers");

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
    const { ids, origen, idioma } = req.body || {};
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({ error: "Faltan los lugares seleccionados" });
      return;
    }

    const idiomaCodigo = idioma === "de" ? "de" : "es";

    const detalles = await Promise.all(
      ids.map(async (id) => {
        const url = `https://places.googleapis.com/v1/places/${id}?languageCode=${idiomaCodigo}`;
        const r = await fetch(url, {
          headers: {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,currentOpeningHours,googleMapsUri,editorialSummary",
          },
        });
        const p = await r.json();

        const lat = p.location?.latitude;
        const lng = p.location?.longitude;

        let distancia = null;
        let viaje = null;
        if (origen && lat && lng) {
          distancia = distanciaKm(origen.lat, origen.lng, lat, lng);
          viaje = estimarViaje(distancia);
        }

        const climaRaw = lat && lng ? await obtenerClima(lat, lng) : null;
        const clima = climaRaw
          ? { temperatura: climaRaw.temperature_2m, codigo: climaRaw.weather_code }
          : null;

        return {
          id,
          nombre: p.displayName?.text || "Sin nombre",
          direccion: p.formattedAddress || "",
          resena: p.editorialSummary?.text || "",
          rating: p.rating || null,
          totalReseñas: p.userRatingCount || 0,
          priceLevel: p.priceLevel || null,
          abiertoAhora: p.currentOpeningHours?.openNow ?? null,
          mapsUrl: p.googleMapsUri || null,
          clima,
          distanciaKm: distancia ? Math.round(distancia * 10) / 10 : null,
          autoMinutos: viaje?.autoMinutos ?? null,
          biciMinutos: viaje?.biciMinutos ?? null,
        };
      })
    );

    res.status(200).json({ detalles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ocurrió un error trayendo el detalle. Probá de nuevo." });
  }
};
