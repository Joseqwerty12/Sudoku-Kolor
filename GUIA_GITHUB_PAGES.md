# Guía Paso a Paso: Publicar en GitHub Pages

Dado que ya hemos subido todo el código actualizado a tu repositorio, solo falta **activar** la función de "GitHub Pages" para que tu juego sea visible en internet.

## Paso 1: Ir a tu Repositorio
1. Abre tu navegador y ve a tu repositorio en GitHub:
   👉 **[https://github.com/Joseqwerty12/Sudoku-Kolor](https://github.com/Joseqwerty12/Sudoku-Kolor)**

## Paso 2: Entrar a Configuración (Settings)
1. En la parte superior derecha de la página del repositorio, haz clic en la pestaña **Settings** (Configuración).
   > Es el icono de engranaje ⚙️.

## Paso 3: Buscar la sección "Pages"
1. En el menú lateral izquierdo, baja hasta encontrar la sección llamada **Pages** (Páginas).
   > Suele estar bajo el grupo "Code and automation".

## Paso 4: Configurar la Fuente (Source)
Aquí es donde ocurre la magia. Sigue estos pasos exactos:

1. En **Source** (Fuente), asegúrate de que diga **Deploy from a branch**.
2. En **Branch** (Rama), selecciona `master` (o `main` si es tu predeterminada).
3. **¡IMPORTANTE!** En la carpeta (la cajita de al lado que dice `/ (root)`), cámbiala y selecciona **/docs**.
   > **¿Por qué?** Porque hemos configurado tu proyecto para que la versión final y optimizada del juego se guarde en la carpeta `docs`. Si eliges `root`, se verá el código fuente y no el juego.
4. Haz clic en el botón **Save** (Guardar).

## Paso 5: ¡Listo!
GitHub tardará unos segundos o minutos en "construir" tu sitio.
- Refresca la página después de un momento.
- Verás una barra superior verde que dice: **"Your site is live at..."** seguido de un enlace.
- Ese enlace es tu juego publicado en internet.

¡Felicidades! Tu Sudoku Kolor (versión en español) ya está online.
