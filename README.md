# HUB 3DS·A — El mapa del año

Portal educativo estático para repasar el año de 3.º Bachillerato Técnico Vocacional en Desarrollo de Software «A», Instituto Nacional Cantón Lourdes (INDEL).

**Enlace público:** (pendiente)  
**Versión:** v0.2 — Cimientos del HUB

## El equipo

Los nombres y la asignación quedan por completar por el equipo:

| Integrante | Rol | Módulos responsables |
|---|---|---|
| Por asignar | Líder Git | Por asignar |
| Por asignar | Diseñador UI | Por asignar |
| Por asignar | Curador de contenido | Por asignar |
| Por asignar | QA y accesibilidad | Por asignar |

El campo `responsable` de cada módulo está pendiente. Completen la asignación con el equipo; no se incluyen nombres por adivinar.

| Módulo | Responsable |
|---|---|
| Desarrollo de aplicaciones de software para la solución de problemas | Por asignar |
| Desarrollo de componentes para dispositivos móviles | Por asignar |
| Mantenimiento y aseguramiento de la operación del sistema informático | Por asignar |
| Módulo 3.3 Administración de Bases de Datos | Por asignar |
| Módulo 3.4 Elaboración de documentación de Sistemas informáticos | Por asignar |
| Módulo 3.6 Conversación en inglés sobre mantenimiento de sistemas informáticos | Por asignar |
| Módulo 3.8 Proyecto innovador de Desarrollo de Software | Por asignar |

## Estructura

```text
index.html
css/estilos.css
js/app.js
data/modulos.js
img/.gitkeep
docs/registro-prompts.md
README.md
.gitignore
```

El sitio usa HTML, CSS y JavaScript puros, sin frameworks, librerías ni npm. Los datos se cargan como un script clásico antes de `app.js`, por lo que el portal no depende de `fetch`.

## Diseño y accesibilidad

- Concepto: un recorrido de estaciones conectado por una línea; en pantallas grandes es horizontal y en celular se apila verticalmente.
- Paleta propuesta: fondo azul noche `#101a2d`, texto claro `#f5f7fb`, acento turquesa `#57dfcd` y acento ámbar `#ffd166`. El turquesa y el ámbar destacan sobre el fondo oscuro; el modo claro usa versiones oscuras para conservar la legibilidad.
- Fuentes: **Space Grotesk** para títulos y **Inter** para texto, con fuentes de respaldo incluidas en CSS.
- El mapa tiene una vista de lista equivalente. Las estaciones y controles son botones de teclado, el foco se ve claramente y el movimiento respeta `prefers-reduced-motion`.
- El contador se calcula desde `data/modulos.js`. Con los datos actuales detecta 7 módulos, 2 docentes distintos y 36 evidencias. La solicitud menciona 3 docentes, pero solo proporciona dos; no se añadió un tercero.

## Cómo abrirlo en local

1. Abre la carpeta del proyecto en VS Code.
2. Inicia **Live Server** y abre `index.html`.
3. También puedes abrir `index.html` directamente en un navegador: el sitio no hace peticiones `fetch`.
4. Abre las herramientas del navegador (F12) y revisa **Consola** y **Red**.

## Agregar o completar módulos

Edita `data/modulos.js` y añade otro objeto a `MODULOS`, respetando la anatomía que ya tienen los siete módulos. `app.js` genera el mapa, la lista, las fichas, los docentes y los totales desde ese arreglo; no se modifica el HTML para agregar una estación.

Los resúmenes, responsables, aprendizajes, instrumentos, programas, herramientas, recursos y preguntas del quiz están pendientes hasta contar con evidencia real. No se inventaron enlaces ni contenidos de las fichas.

## Registro de prompts

La plantilla y el registro de la solicitud inicial están en [docs/registro-prompts.md](docs/registro-prompts.md).

## Publicar en GitHub Pages

No se ha cambiado la configuración del repositorio ni se ha publicado el sitio.

1. En GitHub, abre **Settings → Pages**.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/(root)`, y guarda.
4. Espera la publicación y comprueba `https://USUARIO.github.io/REPO/` en una ventana de incógnito.

Las rutas CSS y JavaScript son relativas, sin `/` inicial, para funcionar bajo la ruta de un sitio de proyecto.

## Flujo Git y commits sugeridos

Usa la URL real del repositorio en lugar de `USUARIO` y `REPO`. Estos son comandos de referencia; **no se ejecutaron**.

```sh
git clone https://github.com/USUARIO/REPO.git
cd REPO
```

Cada persona puede preparar su parte y hacer su propio commit. Añade únicamente los archivos de ese bloque:

```sh
git add index.html .gitignore img/.gitkeep
git commit -m "feat: crear estructura inicial del portal"

git add data/modulos.js
git commit -m "feat: registrar modulos y evidencias"

git add css/estilos.css
git commit -m "style: diseñar mapa responsive y accesible"

git add js/app.js
git commit -m "feat: generar estaciones y fichas desde los datos"

git add README.md docs/registro-prompts.md
git commit -m "docs: explicar el portal y registrar el prompt"
```

`git add` prepara los archivos nombrados; `git commit` guarda ese bloque en el historial con un mensaje Conventional Commit (`tipo: descripción`). Si otra persona ya hizo commits en el remoto, primero sincronicen su rama según el flujo acordado por el equipo.

Después de tener listos los commits:

```sh
git push origin main
git tag -a v0.2 -m "Versión v0.2: Cimientos del HUB"
git push origin v0.2
```

`git push origin main` sube la rama; `git tag -a` crea una etiqueta anotada para la versión y el último `git push` publica esa etiqueta.
