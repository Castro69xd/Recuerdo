// Lee los datos y prepara los lugares donde se mostrarán.
const mapa = document.getElementById("mapa-modulos");
const lista = document.getElementById("lista-modulos");
const panel = document.getElementById("panel-modulo");
const contadorModulos = document.getElementById("total-modulos");
const contadorDocentes = document.getElementById("total-docentes");
const contadorEvidencias = document.getElementById("total-evidencias");
const listaDocentes = document.getElementById("lista-docentes");
const botonMapa = document.getElementById("ver-mapa");
const botonLista = document.getElementById("ver-lista");

// Convierte una lista en texto útil o señala que todavía está pendiente.
function textoDeLista(elementos) {
  if (!Array.isArray(elementos) || elementos.length === 0) {
    return "POR COMPLETAR";
  }
  return elementos.join(", ");
}

// Evita dar por completas listas que solo contienen espacios o marcadores.
function listaCompleta(elementos, minimo) {
  return Array.isArray(elementos) &&
    elementos.length >= minimo &&
    elementos.every(function (elemento) {
      return typeof elemento === "string" &&
        elemento.trim() !== "" &&
        elemento.trim() !== "POR COMPLETAR";
    });
}

// Comprueba si ya están llenas las partes necesarias de una ficha.
function fichaCompleta(modulo) {
  const resumenListo = typeof modulo.resumen === "string" &&
    modulo.resumen.trim() !== "" &&
    modulo.resumen !== "POR COMPLETAR";
  const responsableListo = typeof modulo.responsable === "string" &&
    modulo.responsable.trim() !== "" &&
    modulo.responsable !== "POR COMPLETAR";
  const enlacesListos = Array.isArray(modulo.recursos) &&
    modulo.recursos.length >= 3 &&
    modulo.recursos.every(function (recurso) {
      return recurso &&
        recurso.titulo &&
        recurso.titulo !== "POR COMPLETAR" &&
        /^https?:\/\//i.test(recurso.url || "");
    });
  const quizListo = Array.isArray(modulo.quiz) &&
    modulo.quiz.length >= 3 &&
    modulo.quiz.every(function (pregunta) {
      return pregunta &&
        pregunta.pregunta &&
        pregunta.pregunta !== "POR COMPLETAR" &&
        listaCompleta(pregunta.opciones, 2) &&
        Number.isInteger(pregunta.correcta) &&
        pregunta.correcta >= 0 &&
        pregunta.correcta < pregunta.opciones.length &&
        pregunta.explicacion &&
        pregunta.explicacion !== "POR COMPLETAR";
    });
  return Boolean(
    resumenListo &&
    responsableListo &&
    listaCompleta(modulo.aprendizajes, 3) &&
    listaCompleta(modulo.instrumentos, 2) &&
    listaCompleta(modulo.programas, 2) &&
    listaCompleta(modulo.herramientas, 2) &&
    enlacesListos &&
    quizListo
  );
}

// Crea una pieza de texto sin interpretar el contenido como HTML.
function crearTexto(etiqueta, texto, clase) {
  const elemento = document.createElement(etiqueta);
  elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

// Añade un campo al panel; los campos vacíos aparecen como pendientes.
function agregarCampo(titulo, contenido) {
  const bloque = document.createElement("div");
  bloque.className = "campo-ficha";
  bloque.append(
    crearTexto("h4", titulo),
    crearTexto("p", contenido || "POR COMPLETAR")
  );
  panel.append(bloque);
}

// Muestra recursos como enlaces solo si tienen una dirección web segura.
function agregarRecursos(recursos) {
  const bloque = document.createElement("div");
  bloque.className = "campo-ficha";
  bloque.append(crearTexto("h4", "Recursos"));
  if (!Array.isArray(recursos) || recursos.length === 0) {
    bloque.append(crearTexto("p", "POR COMPLETAR"));
  } else {
    const listaRecursos = document.createElement("ul");
    recursos.forEach(function (recurso) {
      const elemento = document.createElement("li");
      if (recurso && recurso.titulo && /^https?:\/\//i.test(recurso.url || "")) {
        const enlace = document.createElement("a");
        enlace.href = recurso.url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = recurso.titulo;
        elemento.append(enlace);
      } else {
        elemento.textContent = recurso && recurso.titulo ? recurso.titulo : "POR COMPLETAR";
      }
      listaRecursos.append(elemento);
    });
    bloque.append(listaRecursos);
  }
  panel.append(bloque);
}

// Pinta la ficha cuando se activa una estación o un elemento de la lista.
function abrirFicha(modulo) {
  panel.replaceChildren();
  const estado = fichaCompleta(modulo) ? "Ficha completa" : "Ficha pendiente";
  const cabecera = document.createElement("div");
  cabecera.className = "ficha-cabecera";
  cabecera.append(
    crearTexto("p", "MÓDULO " + modulo.numero, "sobrelinea"),
    crearTexto("span", estado, fichaCompleta(modulo) ? "estado completa" : "estado pendiente")
  );
  panel.append(
    cabecera,
    crearTexto("h3", modulo.nombre),
    crearTexto("p", "Docente: " + (modulo.docente || "POR COMPLETAR"), "ficha-docente")
  );
  agregarCampo("Responsable", modulo.responsable);
  agregarCampo("Resumen", modulo.resumen);
  agregarCampo("Aprendizajes", textoDeLista(modulo.aprendizajes));
  agregarCampo("Instrumentos", textoDeLista(modulo.instrumentos));
  agregarCampo("Programas", textoDeLista(modulo.programas));
  agregarCampo("Herramientas", textoDeLista(modulo.herramientas));
  agregarRecursos(modulo.recursos);
  const preguntas = Array.isArray(modulo.quiz) ? modulo.quiz : [];
  agregarCampo("Quiz", textoDeLista(preguntas.map(function (pregunta) {
    return pregunta && pregunta.pregunta ? pregunta.pregunta : "POR COMPLETAR";
  })));

  const evidencias = document.createElement("div");
  evidencias.className = "campo-ficha campo-evidencias";
  evidencias.append(crearTexto("h4", "Evidencias"));
  if (Array.isArray(modulo.evidencias) && modulo.evidencias.length > 0) {
    const listaEvidencias = document.createElement("ul");
    modulo.evidencias.forEach(function (evidencia) {
      listaEvidencias.append(crearTexto("li", evidencia));
    });
    evidencias.append(listaEvidencias);
  } else {
    evidencias.append(crearTexto("p", "POR COMPLETAR"));
  }
  panel.append(evidencias);

  document.querySelectorAll("[data-modulo-id]").forEach(function (boton) {
    boton.setAttribute("aria-pressed", String(boton.dataset.moduloId === modulo.id));
  });
}

// Da a cada docente un color distinto a partir de los colores del tema.
const docentes = Array.from(new Set(MODULOS.map(function (modulo) {
  return modulo.docente;
}).filter(Boolean)));
const estilos = getComputedStyle(document.documentElement);
const coloresDocentes = [
  estilos.getPropertyValue("--c-acento-1").trim(),
  estilos.getPropertyValue("--c-acento-2").trim()
];

// Construye botones para el mapa y para su vista equivalente en lista.
function crearBotonModulo(modulo, vista) {
  const boton = document.createElement("button");
  const docenteNumero = docentes.indexOf(modulo.docente);
  const color = coloresDocentes[docenteNumero % coloresDocentes.length] || coloresDocentes[0];
  boton.type = "button";
  boton.className = vista === "mapa" ? "estacion" : "elemento-lista";
  boton.dataset.moduloId = modulo.id;
  boton.setAttribute("aria-pressed", "false");
  boton.setAttribute("aria-label", "Abrir ficha del módulo " + modulo.numero + ": " + modulo.nombre);
  boton.style.setProperty("--color-estacion", color);

  if (vista === "mapa") {
    boton.append(
      crearTexto("span", String(modulo.numero).padStart(2, "0"), "estacion-punto"),
      crearTexto("span", modulo.nombre, "estacion-nombre")
    );
    const estado = fichaCompleta(modulo) ? "Ficha completa" : "Ficha pendiente";
    boton.append(crearTexto("span", estado, "estacion-estado"));
  } else {
    boton.append(
      crearTexto("span", "Módulo " + modulo.numero, "lista-numero"),
      crearTexto("span", modulo.nombre, "lista-nombre"),
      crearTexto("span", modulo.docente || "Docente por completar", "lista-docente"),
      crearTexto("span", fichaCompleta(modulo) ? "Ficha completa" : "Ficha pendiente", "estado pendiente")
    );
  }

  boton.addEventListener("click", function () {
    abrirFicha(modulo);
  });
  return boton;
}

// Muestra el mapa o la lista, y mantiene su estado para tecnologías de apoyo.
function cambiarVista(vista) {
  const mostrarMapa = vista === "mapa";
  document.getElementById("mapa-marco").hidden = !mostrarMapa;
  lista.hidden = mostrarMapa;
  botonMapa.setAttribute("aria-pressed", String(mostrarMapa));
  botonLista.setAttribute("aria-pressed", String(!mostrarMapa));
  botonMapa.classList.toggle("seleccionado", mostrarMapa);
  botonLista.classList.toggle("seleccionado", !mostrarMapa);
}

// Si no hay módulos, avisa en las vistas en vez de dejar espacios vacíos.
if (MODULOS.length === 0) {
  mapa.append(crearTexto("p", "Todavía no hay módulos para mostrar.", "vacio"));
  lista.append(crearTexto("li", "Todavía no hay módulos para mostrar.", "vacio"));
} else {
  MODULOS.forEach(function (modulo) {
    mapa.append(crearBotonModulo(modulo, "mapa"));
    const elementoLista = document.createElement("li");
    elementoLista.append(crearBotonModulo(modulo, "lista"));
    lista.append(elementoLista);
  });
}

// Calcula los totales directamente desde el contenido de MODULOS.
contadorModulos.textContent = MODULOS.length;
contadorDocentes.textContent = docentes.length;
contadorEvidencias.textContent = MODULOS.reduce(function (total, modulo) {
  return total + (Array.isArray(modulo.evidencias) ? modulo.evidencias.length : 0);
}, 0);

// Añade al pie los docentes únicos sin escribirlos otra vez en el HTML.
docentes.forEach(function (docente) {
  listaDocentes.append(crearTexto("li", docente));
});
if (docentes.length === 0) {
  listaDocentes.append(crearTexto("li", "POR COMPLETAR"));
}

botonMapa.addEventListener("click", function () {
  cambiarVista("mapa");
});
botonLista.addEventListener("click", function () {
  cambiarVista("lista");
});
