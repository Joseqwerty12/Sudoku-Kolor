# Guía para Publicar en Google Play Store

Esta guía te ayudará a generar el archivo **.aab (Android App Bundle)** que necesitas para subir tu juego a Google Play Console.

## ⚠️ IMPORTANTE: El Keystore
Para publicar, crearás un archivo de "llave" digital (Keystore).
*   **GUÁRDALO EN UN LUGAR SEGURO** (Google Drive, correo, etc.).
*   **NO PIERDAS LA CONTRASEÑA**.
*   Si pierdes este archivo o la contraseña, **nunca más podrás actualizar tu juego**. Google no permite actualizar una app con una llave diferente.

---

## Paso 1: Preparar el Proyecto en Android Studio

1.  Abre una terminal en tu carpeta del proyecto y ejecuta:
    ```bash
    npx cap open android
    ```
    (O abre Android Studio manualmente y selecciona la carpeta `android` dentro de tu proyecto).

2.  Espera a que Android Studio termine de indexar y sincronizar (barras de carga en la parte inferior).

---

## Paso 2: Generar el Signed Bundle

1.  En el menú superior de Android Studio, ve a **Build** > **Generate Signed Bundle / APK...**.
2.  Selecciona **Android App Bundle** y haz clic en **Next**.
3.  En el campo "Key store path", haz clic en **Create new...**.

### Creando el Keystore (Llave)
Se abrirá una ventana "New Key Store". Rellénala así:

*   **Key store path**: Haz clic en el icono de carpeta. Elige una ubicación segura (ej: Documentos) y ponle un nombre (ej: `mi-juego-upload-key.jks`).
*   **Password**: Crea una contraseña segura y **ANÓTALA**.
*   **Confirm**: Repite la contraseña.
*   **Key > Alias**: Puedes dejarlo como `key0` o poner `upload`.
*   **Key > Password**: Usa la misma contraseña que arriba para no confundirte.
*   **Validity (years)**: Déjalo en 25 o auméntalo a 50.
*   **Certificate**: Rellena al menos el "First and Last Name" con tu nombre o el de tu desarrolladora. El resto es opcional.
*   Haz clic en **OK**.

4.  De vuelta en la ventana anterior, asegúrate de que "Remember passwords" esté marcado para facilitar futuras actualizaciones. Haz clic en **Next**.

---

## Paso 3: Construir el Archivo Final

1.  Selecciona la variante de construcción **release**.
2.  Haz clic en **Create**.
3.  Android Studio comenzará a construir el archivo. Puede tardar unos minutos.
4.  Cuando termine, aparecerá una notificación abajo a la derecha: "Generate Signed Bundle".
5.  Haz clic en **locate** (o ve a la carpeta `android/app/release/`).
6.  Verás un archivo llamado `app-release.aab`. **¡Este es el archivo que subirás a Google Play!**

---

## Paso 4: Subir a Google Play Console

1.  Ve a [Google Play Console](https://play.google.com/console).
2.  Crea una nueva aplicación.
3.  Sigue los pasos del panel (configurar tienda, clasificación de contenido, etc.).
4.  En la sección de "Producción" o "Pruebas internas", sube el archivo `app-release.aab` que generaste.

## Consejos Adicionales

*   **Versiones**: Cada vez que quieras actualizar tu juego, debes incrementar el `versionCode` en `android/app/build.gradle` antes de generar un nuevo bundle.
*   **Pruebas**: Antes de publicar en Producción, usa "Pruebas internas" (Internal Testing) para instalar el juego en tu propio teléfono y verificar que los anuncios y todo funcionen bien.
