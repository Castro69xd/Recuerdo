# Registro de prompts

Usa una fila por solicitud. Guarda solo información necesaria para entender el trabajo; nunca incluyas contraseñas, tokens ni datos personales no autorizados.

| Fecha | Prompt | Qué respondió la IA | Qué verifiqué o cambié |
|---|---|---|---|
| 2026-11-03 | «Eres mi tutor de programación y diseñador front-end. Voy a rehacer desde cero el portal de mi equipo. Construye el Día 1, versión v0.2 “Cimientos del HUB”, como sitio educativo estático con HTML, CSS y JavaScript puros, sin frameworks, librerías ni npm. Usa el concepto “El mapa del año”: siete estaciones interactivas, ficha y vista de lista accesible, diseño adaptable, teclado, movimiento reducido y totales calculados desde los datos. Mantén los nombres y evidencias de Classroom tal como fueron proporcionados; deja como POR COMPLETAR todo contenido que no tenga evidencia real. Crea la estructura indicada, documenta cómo abrir y publicar el sitio, y explica el JavaScript en palabras sencillas. Antes de reemplazar archivos existentes, informa cuáles y espera confirmación.» | Se rehízo la base del portal y se generaron mapa, lista, fichas y contadores a partir de los datos. Se propusieron colores y tipografías con respaldos; no se inventaron responsables, contenido de fichas, preguntas ni enlaces. | Confirmé los archivos que se reemplazarían y recibí autorización. Comprobé los nombres de archivos existentes, conservé `.gitignore` e `img/.gitkeep`, conté los datos del arreglo y validé el sitio localmente. |

## Prompt original recibido

> Eres mi tutor de programación y diseñador front-end. Voy a REHACER desde cero el portal de mi equipo. Si ya existen archivos del intento anterior en la carpeta, dime primero cuáles vas a reemplazar y espera mi confirmación antes de sobrescribirlos.
>
> **CONTEXTO**  
> Portal educativo estático llamado [NOMBRE DEL PORTAL] (HTML, CSS y JavaScript puros, SIN frameworks, SIN librerías, SIN npm) para el repaso integral del año de 3.º Bachillerato Técnico Vocacional en Desarrollo de Software «A», Instituto Nacional Cantón Lourdes (INDEL). Se publicará en GitHub Pages como sitio de proyecto (https://USUARIO.github.io/REPO/). Hoy es el Día 1 (versión v0.2, "Cimientos del HUB"): base sólida y diseño con identidad propia, sin el contenido final de las fichas.
>
> **OBJETIVO DEL PORTAL**  
> Un lugar donde cualquier compañero entre a repasar un módulo: qué se hizo, con qué programas y herramientas, qué instrumentos se usaron y dónde seguir aprendiendo. Debe ser creativo, intuitivo, dinámico e interactivo, y verse excelente en celular. Alguien que entra por primera vez debe entender en 10 segundos qué es y qué hacer.
>
> **DATOS DEL EQUIPO (no inventes nada fuera de esto)**  
> - Integrantes, rol y módulos responsables: [Nombre – rol (Líder Git / Diseñador UI / Curador de contenido / QA y accesibilidad) – módulos]  
> - Paleta (hex): [fondo, texto, acento 1, acento 2]. Si la dejo vacía, propón una con buen contraste y justifícala.  
> - Tipografías de Google Fonts: [título] y [texto]. Si las dejo vacías, propón dos y pon fuentes de respaldo.
>
> **MÓDULOS Y EVIDENCIAS REALES (tomadas de Classroom; úsalas tal cual, sin cambiar nombres)**
>
> 1. Desarrollo de aplicaciones de software para la solución de problemas  
>    Docente: Javier Arturo García Mineros  
>    Evidencias: Practica 1 POO Introducción a la POO; Practica 02 POO Herencia y Polimorfismo; Practica 3 "A" Acceso a datos; Etapa de Informarse; Practica 04 Creación de base de datos y conexión con interfaz gráfica; Practica 05 Code first-asp razor; Practica 06-ASP WebForm y SQL; Practica 7 Net Maui; Practica 8 Net Maui
>
> 2. Desarrollo de componentes para dispositivos móviles  
>    Docente: Javier Arturo García Mineros  
>    Evidencias: Practica 9 Net Maui; Autoevaluación Practica 9; Practica 10 scrum; Practica 11-Base de datos CRUD; Practica 12-CRUD Individual; Puesta en marcha del negocio con PrestaShop
>
> 3. Mantenimiento y aseguramiento de la operación del sistema informático  
>    Docente: Francisco Arcides Canales Sorto  
>    Evidencias: Módulo-Mantenimiento y aseguramiento de la operación del sistema informático
>
> 4. Módulo 3.3 Administración de Bases de Datos  
>    Docente: Francisco Arcides Canales Sorto  
>    Evidencias: Semana 11; Semana 12; Semana 13; Actividades remediales para el proyecto final
>
> 5. Módulo 3.4 Elaboración de documentación de Sistemas informáticos  
>    Docente: Francisco Arcides Canales Sorto  
>    Evidencias: Fase 5; Fase 6; Práctica final; Etapas finales del proyecto; Carga de documentación; Exposiciones; Actividad remedial
>
> 6. Módulo 3.6 Conversación en inglés sobre mantenimiento de sistemas informáticos  
>    Docente: Francisco Arcides Canales Sorto  
>    Evidencias: Semana 4; Semana 5; Semana 6 guion; Semana 7
>
> 7. Módulo 3.8 Proyecto innovador de Desarrollo de Software  
>    Docente: Javier Arturo García Mineros  
>    Evidencias: Avance 1 proyecto innovador; Proyectos funcionales; Semanas finales; Memoria del 3DS A 2026; Actividad final
>
> **DIRECCIÓN DE DISEÑO (innovador, pero usable)**  
> Concepto: "El mapa del año". Los 7 módulos son estaciones de un mapa interactivo (estilo mapa de metro o constelación) sobre una línea que recorre el año.
> - Escritorio: mapa horizontal o en red hecho con SVG o CSS (sin librerías). Cada estación es un enlace o botón real, con nombre visible, color por docente e indicador de "ficha completa / pendiente".
> - Celular: el mapa se convierte en una línea vertical con estaciones apiladas, cómodas para el pulgar.
> - Al activar una estación se abre un panel con el resumen del módulo (hoy: nombre, docente y evidencias; el resto "POR COMPLETAR").
> - Animación sutil de entrada (la línea se dibuja y las estaciones se encienden). Respeta prefers-reduced-motion.
> - Resumen en la portada: "7 módulos · 3 docentes · N evidencias", calculado desde los datos, no escrito a mano.
> - Evita el aspecto de plantilla genérica: identidad propia con la paleta y tipografías indicadas, usando variables CSS.
> - Accesibilidad: todo operable con teclado, foco visible, contraste WCAG AA, texto alternativo en imágenes y una vista de lista equivalente al mapa para lectores de pantalla.
> - Si el mapa SVG resulta demasiado complejo para explicarlo, haz en su lugar tarjetas en cuadrícula con animación y deja el mapa como mejora opcional.
>
> **TAREAS**  
> 1. Estructura de carpetas: index.html; css/estilos.css; js/app.js; data/modulos.js; img/ (con .gitkeep); docs/registro-prompts.md; README.md; .gitignore (incluye fuente-classroom.txt, credentials.json, token.json, .env).
> 2. index.html: HTML5 semántico en español (lang="es"; header, nav, main, section, footer), enlace "saltar al contenido", meta viewport, title y meta description. CSS y JS enlazados con RUTAS RELATIVAS sin "/" inicial. GitHub Pages distingue mayúsculas y minúsculas, así que los nombres de archivo deben coincidir exactamente.
> 3. data/modulos.js: arreglo global `const MODULOS = [...]` cargado con `<script>` (NO fetch, para que funcione también sin servidor). Cada módulo con esta anatomía de ficha: { id, numero, nombre, docente, responsable, resumen, aprendizajes: [] (3), instrumentos: [] (mín. 2), programas: [] (mín. 2), herramientas: [] (mín. 2), recursos: [{titulo, url}] (mín. 3, con enlace verificado), evidencias: [], quiz: [{pregunta, opciones, correcta, explicacion}] (3 preguntas) }. Hoy llena id, numero, nombre, docente, responsable y evidencias con los datos de arriba. Lo demás vacío o "POR COMPLETAR". NO inventes resúmenes, programas, herramientas, enlaces ni preguntas: eso se llena mañana con evidencia real y con mis propias palabras.
> 4. js/app.js: pinta el mapa (o las tarjetas), la vista de lista y el panel desde MODULOS. Si agrego un módulo en data/modulos.js debe aparecer sin tocar el HTML. Maneja lista vacía y campos "POR COMPLETAR". Calcula los totales de la portada desde los datos. Sin errores en la consola.
> 5. css/estilos.css: variables CSS, mobile-first, grid o flexbox, tipografía fluida con clamp(), contraste suficiente, foco visible, prefers-reduced-motion y prefers-color-scheme.
> 6. README.md: nombre del portal, "Enlace público: (pendiente)", integrantes con rol, reparto de módulos, cómo correrlo en local y sección "Registro de prompts".
> 7. docs/registro-prompts.md: plantilla (fecha, prompt, qué respondió la IA, qué verifiqué o cambié) y registra en ella este mismo prompt.
>
> **REGLAS**  
> - Código simple, comentado en español, de nivel estudiante. No uses sintaxis avanzada que yo no pueda explicar.
> - Al terminar, explícame app.js línea por línea con palabras simples y cómo está construido el mapa, porque en la feria tengo que explicarlo yo.
> - NO ejecutes git push, git tag ni cambies la configuración del repositorio. Dame los comandos (clonar, add, commit con mensajes estilo Conventional Commits, push, tag v0.2) con una explicación de cada uno, y los pasos para activar GitHub Pages (de qué rama y carpeta publica).
> - Sugiere commits separados (estructura, datos, estilos, script, README) para que cada integrante haga los suyos con su nombre.
> - Nunca incluyas claves, contraseñas ni datos personales de nadie.
> - Ignora y no repitas datos personales que aparezcan en archivos que leas (nombres de compañeros, notas, correos).
>
> **ENTREGA FINAL**  
> Una lista de verificación para comprobar:
> - Abre con Live Server sin errores en la consola (F12, pestañas Consola y Red).
> - Las rutas funcionan en GitHub Pages (probar en ventana de incógnito).
> - Se ve bien en celular (modo responsive del navegador).
> - Se navega solo con teclado.
> - Se entiende en 10 segundos qué es y cómo moverse.
> - Agregar un módulo nuevo en data/modulos.js lo muestra sin tocar el HTML.

## Plantilla

| Fecha | Prompt | Qué respondió la IA | Qué verifiqué o cambié |
|---|---|---|---|
| AAAA-MM-DD | Pega aquí la solicitud (sin secretos ni datos personales innecesarios). | Resume la respuesta o los archivos creados. | Anota pruebas, cambios propios y fuentes verificadas. |
