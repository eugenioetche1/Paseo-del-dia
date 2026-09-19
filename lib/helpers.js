// Funciones compartidas por las funciones serverless de /api

// Distancia en línea recta entre dos coordenadas (fórmula de Haversine), en km.
function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estima minutos de viaje según distancia y modo (aproximado, no es ruta real).
function estimarViaje(km) {
  const auto = Math.round((km / 45) * 60); // ~45 km/h promedio con tránsito
  const bici = km <= 15 ? Math.round((km / 15) * 60) : null; // ~15 km/h, solo si es cercano
  return { autoMinutos: auto, biciMinutos: bici };
}

// Clima actual en un punto, usando Open-Meteo (gratis, no requiere API key).
async function obtenerClima(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code&timezone=auto`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const data = await r.json();
    return data.current || null;
  } catch (e) {
    return null;
  }
}

module.exports = { distanciaKm, estimarViaje, obtenerClima };
