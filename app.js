const DICCIONARIO = {
  es: {
    tituloHero: "¿Adónde salimos hoy?",
    subtituloHero: "Contanos qué tenés ganas de hacer y armamos algunas ideas para tu paseo.",
    labelCiudad: "Desde dónde salís",
    placeholderCiudad: "Ej: Nordhorn, Alemania",
    labelDistancia: "Distancia máxima a recorrer",
    labelPalabras: "¿Qué tenés ganas de hacer?",
    placeholderPalabras: "Ej: parques, historia, tranquilidad, bosques",
    ayudaPalabras: "Separá las ideas con comas — nos sirven de guía para buscar.",
    labelDuracion: "Duración del paseo",
    opcionRapida: "Una hora, algo rápido",
    opcionMedia: "Media jornada",
    opcionCompleta: "El día completo",
    labelPersonas: "¿Cuántos van?",
    labelEdades: "Edades de los niños (si van)",
    placeholderEdades: "Ej: 4 y 8 años — dejalo vacío si no hay niños",
    labelTecho: "Priorizar lugares bajo techo (por si el clima no ayuda)",
    botonBuscar: "Buscar ideas",
    tituloResultados: "Elegí las que te interesen",
    botonContinuar: "Continuar con las seleccionadas",
    tituloDetalle: "Un poco más de info",
    botonNuevaBusqueda: "Empezar una búsqueda nueva",
    footerTexto: "Los datos de lugares y valoraciones vienen de Google Maps. Las distancias y tiempos de viaje son estimados.",
    buscando: "Buscando ideas para tu paseo...",
    buscandoDetalle: "Buscando más detalles...",
    sinConexion: "No pude conectar con el servidor. Probá de nuevo en un momento.",
    sinResultados: "No encontré lugares con esos filtros. Probá con otras palabras clave o más distancia.",
    climaAhoraEn: (ciudad, desc, temp) => `Ahora mismo en <strong>${ciudad}</strong>: ${desc}, ${temp}°C.`,
    reseñas: (n) => `${n} reseñas`,
    dtValoracion: "Valoración",
    dtPrecio: "Precio",
    dtClima: "Clima ahí",
    dtDistancia: "Distancia",
    distanciaLineaRecta: (km) => `${km} km (línea recta)`,
    dtViaje: "Viaje estimado",
    minAuto: (m) => `~${m} min en auto`,
    minBici: (m) => `~${m} min en bici`,
    dtAhora: "Ahora",
    abierto: "Abierto",
    cerrado: "Cerrado",
    dtMapa: "Mapa",
    verEnMaps: "Ver en Google Maps",
    precios: {
      PRICE_LEVEL_FREE: "Gratis",
      PRICE_LEVEL_INEXPENSIVE: "Económico",
      PRICE_LEVEL_MODERATE: "Precio moderado",
      PRICE_LEVEL_EXPENSIVE: "Caro",
      PRICE_LEVEL_VERY_EXPENSIVE: "Muy caro",
      sinDatos: "Sin datos de precio",
    },
    clima: {
      0: "despejado", 1: "mayormente despejado", 2: "parcialmente nublado", 3: "nublado",
      45: "neblina", 48: "neblina helada", 51: "llovizna leve", 53: "llovizna", 55: "llovizna intensa",
      61: "lluvia leve", 63: "lluvia", 65: "lluvia intensa", 71: "nieve leve", 73: "nieve", 75: "nieve intensa",
      80: "chubascos", 81: "chubascos fuertes", 95: "tormenta", sinDatos: "sin datos",
    },
  },
  de: {
    tituloHero: "Wohin gehen wir heute?",
    subtituloHero: "Erzähl uns, worauf du Lust hast, und wir schlagen dir ein paar Ideen für deinen Ausflug vor.",
    labelCiudad: "Von wo startest du",
    placeholderCiudad: "Z.B.: Nordhorn, Deutschland",
    labelDistancia: "Maximale Entfernung",
    labelPalabras: "Worauf hast du Lust?",
    placeholderPalabras: "Z.B.: Parks, Geschichte, Ruhe, Wälder",
    ayudaPalabras: "Trenne die Stichwörter mit Kommas — sie helfen uns bei der Suche.",
    labelDuracion: "Dauer des Ausflugs",
    opcionRapida: "Eine Stunde, etwas Kurzes",
    opcionMedia: "Halber Tag",
    opcionCompleta: "Ganzer Tag",
    labelPersonas: "Wie viele Personen?",
    labelEdades: "Alter der Kinder (falls dabei)",
    placeholderEdades: "Z.B.: 4 und 8 Jahre — leer lassen, wenn keine Kinder dabei sind",
    labelTecho: "Orte drinnen bevorzugen (falls das Wetter nicht mitspielt)",
    botonBuscar: "Ideen suchen",
    tituloResultados: "Wähle aus, was dich interessiert",
    botonContinuar: "Mit der Auswahl fortfahren",
    tituloDetalle: "Ein paar mehr Details",
    botonNuevaBusqueda: "Neue Suche starten",
    footerTexto: "Orts- und Bewertungsdaten stammen von Google Maps. Entfernungen und Fahrzeiten sind geschätzt.",
    buscando: "Wir suchen Ideen für deinen Ausflug...",
    buscandoDetalle: "Wir laden mehr Details...",
    sinConexion: "Verbindung zum Server fehlgeschlagen. Bitte versuch es gleich noch einmal.",
    sinResultados: "Mit diesen Filtern haben wir nichts gefunden. Versuch es mit anderen Stichwörtern oder mehr Entfernung.",
    climaAhoraEn: (ciudad, desc, temp) => `Gerade jetzt in <strong>${ciudad}</strong>: ${desc}, ${temp}°C.`,
    reseñas: (n) => `${n} Bewertungen`,
    dtValoracion: "Bewertung",
    dtPrecio: "Preis",
    dtClima: "Wetter dort",
    dtDistancia: "Entfernung",
    distanciaLineaRecta: (km) => `${km} km (Luftlinie)`,
    dtViaje: "Geschätzte Fahrzeit",
    minAuto: (m) => `~${m} Min. mit dem Auto`,
    minBici: (m) => `~${m} Min. mit dem Rad`,
    dtAhora: "Jetzt",
    abierto: "Geöffnet",
    cerrado: "Geschlossen",
    dtMapa: "Karte",
    verEnMaps: "Auf Google Maps ansehen",
    precios: {
      PRICE_LEVEL_FREE: "Kostenlos",
      PRICE_LEVEL_INEXPENSIVE: "Günstig",
      PRICE_LEVEL_MODERATE: "Mittleres Preisniveau",
      PRICE_LEVEL_EXPENSIVE: "Teuer",
      PRICE_LEVEL_VERY_EXPENSIVE: "Sehr teuer",
      sinDatos: "Keine Preisangabe",
    },
    clima: {
      0: "klar", 1: "überwiegend klar", 2: "teilweise bewölkt", 3: "bewölkt",
      45: "Nebel", 48: "Reifnebel", 51: "leichter Nieselregen", 53: "Nieselregen", 55: "starker Nieselregen",
      61: "leichter Regen", 63: "Regen", 65: "starker Regen", 71: "leichter Schneefall", 73: "Schneefall", 75: "starker Schneefall",
      80: "Schauer", 81: "starke Schauer", 95: "Gewitter", sinDatos: "keine Daten",
    },
  },
};

let idiomaActual = localStorage.getItem("idioma") || "es";

function t(clave) {
  return DICCIONARIO[idiomaActual][clave];
}

function aplicarIdioma() {
  document.documentElement.lang = idiomaActual;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll(".idioma-boton").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === idiomaActual));
  });
}

document.querySelectorAll(".idioma-boton").forEach((boton) => {
  boton.addEventListener("click", () => {
    idiomaActual = boton.dataset.lang;
    localStorage.setItem("idioma", idiomaActual);
    aplicarIdioma();
  });
});

aplicarIdioma();

const form = document.getElementById("form-filtros");
const distanciaInput = document.getElementById("distancia");
const distanciaValor = document.getElementById("distancia-valor");
const mensajeEstado = document.getElementById("mensaje-estado");
const climaSeccion = document.getElementById("clima-actual");
const resultadosSeccion = document.getElementById("resultados");
const listaResultados = document.getElementById("lista-resultados");
const btnContinuar = document.getElementById("btn-continuar");
const detalleSeccion = document.getElementById("detalle");
const listaDetalle = document.getElementById("lista-detalle");
const btnNuevaBusqueda = document.getElementById("btn-nueva-busqueda");

let origenActual = null;
let lugaresActuales = [];
let ciudadActual = "";

distanciaInput.addEventListener("input", () => {
  distanciaValor.textContent = distanciaInput.value;
});

function mostrarMensaje(texto) {
  mensajeEstado.hidden = !texto;
  mensajeEstado.textContent = texto || "";
}

function textoClima(codigo) {
  const dic = t("clima");
  return dic[codigo] || dic.sinDatos;
}

function textoPrecio(priceLevel) {
  const dic = t("precios");
  return priceLevel ? dic[priceLevel] || priceLevel : dic.sinDatos;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultadosSeccion.hidden = true;
  detalleSeccion.hidden = true;
  climaSeccion.hidden = true;
  mostrarMensaje(t("buscando"));

  ciudadActual = document.getElementById("ciudad").value.trim();

  const payload = {
    ciudad: ciudadActual,
    distanciaMaxKm: Number(distanciaInput.value),
    palabrasClave: document.getElementById("palabras").value.trim(),
    duracion: document.getElementById("duracion").value,
    personas: document.getElementById("personas").value,
    edadesNinos: document.getElementById("edades").value.trim(),
    priorizarTecho: document.getElementById("techo").checked,
    idioma: idiomaActual,
  };

  try {
    const resp = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await resp.json();

    if (!resp.ok) {
      mostrarMensaje(data.error || t("sinConexion"));
      return;
    }

    origenActual = data.origen;
    lugaresActuales = data.lugares || [];

    if (data.clima) {
      climaSeccion.hidden = false;
      climaSeccion.innerHTML = t("climaAhoraEn")(ciudadActual, textoClima(data.clima.codigo), Math.round(data.clima.temperatura));
    }

    if (lugaresActuales.length === 0) {
      mostrarMensaje(t("sinResultados"));
      return;
    }

    mostrarMensaje("");
    renderizarResultados(lugaresActuales);
    resultadosSeccion.hidden = false;
  } catch (err) {
    mostrarMensaje(t("sinConexion"));
  }
});

function renderizarResultados(lugares) {
  listaResultados.innerHTML = "";
  lugares.forEach((lugar) => {
    const tarjeta = document.createElement("label");
    tarjeta.className = "tarjeta-lugar";
    tarjeta.innerHTML = `
      <input type="checkbox" value="${lugar.id}" data-lat="${lugar.lat}" data-lng="${lugar.lng}" />
      <div class="tarjeta-lugar__contenido">
        <h3>${lugar.nombre}</h3>
        ${lugar.rating ? `<p><span class="rating">★ ${lugar.rating}</span> (${t("reseñas")(lugar.totalReseñas)})</p>` : ""}
        <p>${lugar.resena || lugar.direccion}</p>
      </div>
    `;
    listaResultados.appendChild(tarjeta);
  });

  actualizarBotonContinuar();
  listaResultados.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", actualizarBotonContinuar);
  });
}

function actualizarBotonContinuar() {
  const seleccionados = listaResultados.querySelectorAll('input[type="checkbox"]:checked');
  btnContinuar.disabled = seleccionados.length === 0;
}

btnContinuar.addEventListener("click", async () => {
  const seleccionados = Array.from(listaResultados.querySelectorAll('input[type="checkbox"]:checked')).map(
    (cb) => cb.value
  );

  mostrarMensaje(t("buscandoDetalle"));
  detalleSeccion.hidden = true;

  try {
    const resp = await fetch("/api/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: seleccionados, origen: origenActual, idioma: idiomaActual }),
    });
    const data = await resp.json();

    if (!resp.ok) {
      mostrarMensaje(data.error || t("sinConexion"));
      return;
    }

    mostrarMensaje("");
    renderizarDetalle(data.detalles);
    detalleSeccion.hidden = false;
    detalleSeccion.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    mostrarMensaje(t("sinConexion"));
  }
});

function renderizarDetalle(detalles) {
  listaDetalle.innerHTML = "";
  detalles.forEach((d) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-detalle";

    const filas = [];
    if (d.rating) filas.push(`<dt>${t("dtValoracion")}</dt><dd class="rating">★ ${d.rating} (${t("reseñas")(d.totalReseñas)})</dd>`);
    filas.push(`<dt>${t("dtPrecio")}</dt><dd>${textoPrecio(d.priceLevel)}</dd>`);
    if (d.clima) filas.push(`<dt>${t("dtClima")}</dt><dd>${textoClima(d.clima.codigo)}, ${Math.round(d.clima.temperatura)}°C</dd>`);
    if (d.distanciaKm != null) filas.push(`<dt>${t("dtDistancia")}</dt><dd>${t("distanciaLineaRecta")(d.distanciaKm)}</dd>`);
    if (d.autoMinutos) {
      let texto = t("minAuto")(d.autoMinutos);
      if (d.biciMinutos) texto += ` · ${t("minBici")(d.biciMinutos)}`;
      filas.push(`<dt>${t("dtViaje")}</dt><dd>${texto}</dd>`);
    }
    if (d.abiertoAhora !== null) filas.push(`<dt>${t("dtAhora")}</dt><dd>${d.abiertoAhora ? t("abierto") : t("cerrado")}</dd>`);
    if (d.mapsUrl) filas.push(`<dt>${t("dtMapa")}</dt><dd><a href="${d.mapsUrl}" target="_blank" rel="noopener">${t("verEnMaps")}</a></dd>`);

    tarjeta.innerHTML = `
      <h3>${d.nombre}</h3>
      ${d.resena ? `<p>${d.resena}</p>` : ""}
      <dl>${filas.join("")}</dl>
    `;
    listaDetalle.appendChild(tarjeta);
  });
}

btnNuevaBusqueda.addEventListener("click", () => {
  detalleSeccion.hidden = true;
  resultadosSeccion.hidden = true;
  climaSeccion.hidden = true;
  form.scrollIntoView({ behavior: "smooth" });
});
