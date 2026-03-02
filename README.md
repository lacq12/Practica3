# Banco Estudiantil (HTML + CSS)

Sitio estático de ejemplo con estructura tipo banca: navegación, portada con carrusel sin JavaScript, productos (Préstamos, Becas, Maestrías), Centro de ayuda, Contacto y páginas informativas.

## Estructura
```
/ (raíz)
├─ index.html
├─ prestamos.html
├─ becas.html
├─ calculadora.html
├─ maestrias.html
├─ nosotros.html
├─ ayuda.html
├─ contacto.html
├─ terminos.html
└─ assets/
   ├─ css/
   │  └─ styles.css
   └─ img/
      └─ logo-banco-estudiantil.svg
```

## Publicar en GitHub Pages
1. Crea un repositorio y sube todos los archivos.
2. Ve a **Settings → Pages**.
3. En **Source**, elige **Deploy from a branch**.
4. Selecciona la rama **main** y la carpeta **root**.
5. Guarda y espera unos segundos hasta que salga el enlace público.

> Consejo: incluye el archivo `.nojekyll` (ya agregado) para evitar que GitHub Pages procese Jekyll.

## Notas
- Carrusel implementado con HTML/CSS (radios + labels), accesible y sin JS.
- Logo en SVG, escalable y ligero.
- Paleta y tipografía fácilmente ajustables desde `assets/css/styles.css`.

---
© 2026 Banco Estudiantil — Demostrativo.
