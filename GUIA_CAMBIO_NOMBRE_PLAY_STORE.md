# Guía Detallada: Cómo cambiar el nombre de tu App en Google Play Console

Esta guía está diseñada para que no te pierdas. Sigue cada paso con atención.

## 1. Ingresar a la Consola
1.  Abre tu navegador y ve a: [https://play.google.com/console](https://play.google.com/console).
2.  Si te pide iniciar sesión, entra con tu cuenta de desarrollador.
3.  Verás una lista con tus aplicaciones. **Haz clic en el nombre actual de tu juego** (ej. "Sudoku Nova" o como lo hayas llamado al crearlo).

## 2. Localizar el menú correcto (La parte difícil)
Una vez dentro del panel de tu juego, verás una **barra de menú a la izquierda** con muchas opciones.
1.  Baja por ese menú hasta encontrar la sección llamada **"Crece"** (en inglés: *Grow*) o **"Presencia en Google Play Store"** (en inglés: *Store presence*).
2.  Dentro de esa sección, busca y haz clic en:
    *   **"Ficha de Play Store principal"**
    *   (En inglés: *Main store listing*)

## 3. Cambiar el Nombre y Textos
Ahora deberías ver un formulario en la parte derecha de la pantalla con los detalles de tu app.
1.  Busca el campo **"Nombre de la aplicación"** (*App name*).
2.  Borra el texto antiguo y escribe: **Sudoku Kolor**. (Máximo 30 caracteres).
3.  Baja un poco más a **"Descripción breve"**. Asegúrate de que diga "Sudoku Kolor" si el nombre aparece ahí.
    *   *Texto sugerido:* "El Sudoku clásico reinventado con diseño moderno, animaciones y niveles únicos."
4.  Baja a **"Descripción completa"**. Revisa el texto y cambia cualquier mención de "Sudoku Nova" por "Sudoku Kolor".

## 4. Guardar
1.  Mira en la **esquina inferior derecha** de la pantalla. Verás un botón azul (o gris si no has cambiado nada) que dice **"Guardar"** (*Save*).
2.  Haz clic en él.
3.  Arriba de la página te saldrá un mensaje confirmando que los cambios se han guardado o enviado a revisión.

---

## Siguiente Paso: Subir la nueva versión (AAB)
Para que el nombre cambie también en el teléfono del usuario (debajo del icono), necesitas subir el archivo `.aab` que acabamos de generar.

1.  En el menú de la izquierda, busca la sección **"Lanzamiento"** (*Release*).
2.  Haz clic en **"Producción"** (*Production*) o **"Pruebas internas"** (*Internal testing*), dependiendo de dónde quieras subirlo.
3.  Haz clic en **"Crear nueva versión"** (*Create new release*) o **"Editar versión"** (*Edit release*).
4.  Sube el archivo `app-release.aab` que está en la carpeta:
    `android/app/build/outputs/bundle/release/app-release.aab`
5.  Sigue los pasos para revisar y lanzar la versión.
