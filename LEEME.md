# Sitio web — Quantum Optics and Condensed Matter Physics (QOMP)

Grupo de investigación de la **Universidad de Panamá**.

Sitio estático (HTML + CSS + JS, sin dependencias ni compilación). Funciona con doble clic y se puede publicar en cualquier hosting estático.

## 1. Estructura de archivos

```
Página web/
├── index.html           → Inicio · Acerca del grupo · Misión, visión y valores
├── lineas.html          → Líneas de investigación
├── integrantes.html     → Integrantes
├── publicaciones.html   → Publicaciones (con filtros)
├── proyectos.html       → Proyectos (activos y concluidos)
├── infraestructura.html → Infraestructura y equipamiento
├── formacion.html       → Formación y docencia
├── noticias.html        → Noticias
├── recursos.html        → Recursos abiertos
├── galeria.html         → Galería (con lightbox)
├── contacto.html        → Contacto (con formulario demo)
└── assets/
    ├── css/styles.css   → Todos los estilos (una sola hoja compartida)
    ├── js/main.js       → Menú móvil, filtros, galería, animaciones
    └── img/             → Aquí van tus imágenes
```

## 2. Cómo ver el sitio

Abre `index.html` con doble clic en tu navegador. No necesitas servidor.

## 3. Cómo editar el contenido

Busca en los archivos las marcas **`[EDITAR]`**: cada una señala un texto que debes reemplazar con datos reales (nombre del grupo, integrantes, publicaciones, dirección, etc.).

- **Nombre del grupo y logo:** en cada página, dentro de `<a class="marca">`. El logo se carga con `<img class="marca__img" src="assets/img/logo-qomp.png">` y el subtítulo es la institución.
- **Imágenes que debes guardar en `assets/img/`** (aún faltan):
  - `logo-qomp.png` — logo del grupo (usado en cabecera y pie de las 11 páginas).
  - `up-entrada.jpg` — foto de la entrada del campus (galería).
  - `up-edificio.jpg` — foto del edificio de la Administración (galería).
- **Colores:** cambia las variables al inicio de `assets/css/styles.css` (sección "Tokens de diseño"), p. ej. `--azul-600` y `--cian-400`.
- **Tipografías:** se cargan desde Google Fonts (Inter + Spectral). Si prefieres no depender de internet, elimina el `<link>` de fuentes de cada página.
- **Fotos:** coloca las imágenes en `assets/img/` y reemplaza los bloques de marcador (iniciales / emojis) por etiquetas `<img>` — hay una nota `[EDITAR]` en cada sitio donde aplica.

## 4. Formulario de contacto

Es una demostración: no envía correos por sí solo. Para activarlo, conéctalo a un servicio como **Formspree**, **Netlify Forms** o tu propio backend (instrucción marcada con `[EDITAR]` en `contacto.html`).

## 5. Publicar el sitio (gratis)

- **GitHub Pages:** sube la carpeta a un repositorio y actívalo en Settings → Pages.
- **Netlify / Cloudflare Pages:** arrastra la carpeta a su panel; queda publicado en segundos.

---

¿Me pasas los datos reales (nombre del grupo, integrantes, publicaciones, dirección…)? Los integro y quitamos todas las marcas `[EDITAR]`.
