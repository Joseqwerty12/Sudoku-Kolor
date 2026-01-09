# Guía Paso a Paso: Publicar en Google Play Store (Sudoku Kolor)

Esta guía está diseñada para que no te pierdas en el proceso. Sigue cada punto con calma.

## Antes de Empezar
Asegúrate de tener a mano:
1.  **El archivo del juego:** `android/app/build/outputs/bundle/release/app-release.aab`
2.  **Los textos:** Abre el archivo `FICHA_PLAY_STORE.md` que creamos.
3.  **Las imágenes:** Ten a mano la carpeta donde se guardaron el icono y las capturas.

---

## Paso 1: Crear la Aplicación

1.  Entra a [Google Play Console](https://play.google.com/console) e inicia sesión.
2.  Haz clic en el botón azul **"Crear aplicación"** (arriba a la derecha).
3.  Rellena el formulario inicial:
    *   **Nombre de la aplicación:** Copia el nombre de `FICHA_PLAY_STORE.md` (ej. *Sudoku Kolor: Lógica y Relax*).
    *   **Idioma predeterminado:** Español (España) o Español (Latinoamérica).
    *   **¿Es una aplicación o un juego?:** Selecciona **Juego**.
    *   **¿Es gratis o de pago?:** Selecciona **Gratis**.
    *   **Declaraciones:** Marca las casillas de "Confirmar que la app cumple las políticas..." y "Leyes de exportación de EE. UU.".
4.  Haz clic en **"Crear aplicación"** (abajo a la derecha).

---

## Paso 2: Configuración Inicial (El Panel de Control)

Ahora verás el "Panel de control" (Dashboard). Google te mostrará una lista de tareas llamada "Empieza a configurar tu aplicación". Vamos a hacerlas una por una.

### A. Informar sobre el contenido de tu app
Haz clic en **"Ver tareas"** o ve seleccionando cada una de la lista:

1.  **Acceso a aplicaciones:**
    *   Selecciona: **"Todas las funciones están disponibles sin acceso especial"**.
    *   Guardar.
2.  **Anuncios:**
    *   Selecciona: **"Sí, mi aplicación contiene anuncios"** (porque pusimos AdMob).
    *   Guardar.
3.  **Clasificación de contenido (Cuestionario IARC):**
    *   Haz clic en "Empezar cuestionario".
    *   **Categoría:** Selecciona "Juego" o "Entretenimiento".
    *   **Violencia/Miedo/Sexualidad:** Responde **NO** a todo (es un Sudoku).
    *   **Juego online/Interacción:** Responde según corresponda (generalmente NO para un Sudoku simple, a menos que tengas chat).
    *   Al final, te dará una clasificación (ej. PEGI 3 o Para todos). Dale a **Guardar** y luego **Siguiente**.
4.  **Audiencia objetivo:**
    *   Selecciona las edades: **13-15, 16-17 y +18**. (Evita seleccionar "menores de 13" para no complicarte con leyes de protección infantil por ahora, a menos que estés seguro).
    *   ¿Tu ficha de Play Store podría atraer a niños involuntariamente?: Marca **Sí** o **No** (Un Sudoku colorido podría, pero generalmente "No" es seguro si el diseño es sobrio. Si es muy colorido, pon "Sí" para que Google ponga una etiqueta de "No diseñado para niños" si es necesario, o simplemente selecciona +13).
    *   Guardar.
5.  **Aplicaciones de noticias:**
    *   Selecciona: **"No"**.
    *   Guardar.
6.  **Rastreo de contactos y estado de COVID-19:**
    *   Selecciona: **"Mi aplicación no es una aplicación de rastreo..."**.
    *   Guardar.
7.  **Seguridad de los datos (Data Safety):**
    *   Este es el paso más largo. Como usas AdMob, sí recopilas algunos datos.
    *   ¿Recopilas o compartes datos?: **Sí**.
    *   ¿Están encriptados?: **Sí**.
    *   ¿El usuario puede pedir borrarlos?: **Sí** (o No, según tu política).
    *   **Tipos de datos:** Busca "Identificadores de dispositivo u otros identificadores" y márcalo (AdMob lo usa).
    *   **Uso:** Marca "Publicidad o marketing" y "Análisis".
    *   Guardar.
8.  **Aplicación gubernamental:**
    *   Selecciona: **"No"**.

---

## Paso 3: La Ficha de la Tienda (Lo que ve el usuario)

Vuelve al Panel de control y busca la sección **"Gestionar cómo se presenta tu aplicación"** -> **"Seleccionar categoría y proporcionar detalles de contacto"**.

1.  **Categoría:**
    *   Categoría: **Juego**.
    *   Etiquetas: Busca y añade **"Puzles"**, **"Lógica"**, **"Sudoku"**.
2.  **Detalles de contacto:**
    *   Pon tu correo electrónico (será público).
    *   Sitio web (opcional).
    *   Guardar.

Ahora ve al menú de la izquierda: **Presencia en Google Play Store** -> **Ficha de Play Store principal**.

1.  **Nombre, Descripción breve y completa:** Copia y pega los textos del archivo `FICHA_PLAY_STORE.md`.
2.  **Gráficos:**
    *   **Icono:** Sube la imagen del icono (512x512) que generamos.
    *   **Gráfico de funciones:** Sube la imagen rectangular (1024x500).
    *   **Teléfono:** Sube las capturas de pantalla (screenshots) que tomamos. Necesitas al menos 2.
3.  Haz clic en **Guardar**.

---

## Paso 4: Subir el Archivo del Juego (Producción)

Si quieres publicarlo directamente para todo el mundo:

1.  En el menú de la izquierda, ve a **Producción**.
2.  Arriba a la derecha, haz clic en **"Crear nueva versión"**.
3.  **App bundles:** Haz clic en "Subir" y busca tu archivo `app-release.aab`.
    *   *Nota:* Si es la primera vez, te pedirá "Elegir clave de firma". Selecciona "Usar clave generada por Google" (es lo más fácil, Google gestiona la seguridad de tu llave `jks`).
4.  Espera a que se suba. Si todo sale bien, verás el archivo en la lista.
5.  **Nombre de la versión:** Pon algo como "1.0 - Lanzamiento inicial".
6.  **Notas de la versión:** Escribe algo breve como "¡Lanzamiento oficial de Sudoku Kolor!".
7.  Haz clic en **Siguiente**.

---

## Paso 5: Revisión y Lanzamiento

1.  Verás una pantalla de "Revisar y lanzar".
2.  Si hay **Errores** (rojos), debes arreglarlos (te dirá qué falta).
3.  Si hay **Advertencias** (amarillas), léelas, pero normalmente puedes seguir.
4.  Si todo está correcto, verás un botón abajo a la derecha que dice **"Guardar"** o **"Iniciar lanzamiento a Producción"**.
5.  Haz clic en **"Iniciar lanzamiento a Producción"**.

¡Felicidades! Tu juego ha sido enviado a revisión. Google tardará unos días (normalmente 1-3 días) en aprobarlo. Te llegará un correo cuando esté publicado.
