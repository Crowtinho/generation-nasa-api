# AB: Using NPM - End of module Assessments
Crear una aplicación web interactiva que muestre la "Astronomy Picture of the Day" (APOD) de la NASA, permitiendo explorar imágenes astronómicas históricas y guardar las favoritas en el navegador.
La NASA APOD (Astronomy Picture of the Day) es un programa que publica diariamente una imagen o video astronómico acompañado de una breve explicación científica. Estas imágenes incluyen fotos de galaxias nebulosas, planetas y eventos cósmicos, capturadas por telescopios como el Hubble.
En este laboratorio, usarás la API de la NASA para construir un explorador de APODs con las siguientes funcionalidades:
1. Obtener y mostrar la "Foto del Día" (APOD)
    - Conectar con la API de la NASA para obtener la imagen/video del día actual.
    - Mostrar en pantalla:
    - Título y fecha de la imagen.
    - Imagen (o video si aplica).
    - Explicación científica proporcionada por la NASA.
2. Selector de fechas
    - Añadir un campo de tipo date para que los usuarios puedan buscar APODs de fechas pasadas.
    - Validar que no se ingresen fechas futuras (la NASA no las tiene).
3. Sistema de Favoritos
    - Implementar un botón para guardar la APOD actual en favoritos.
    - Almacenar los favoritos en localStorage para que persistan al recargar la página.
    - Mostrar una lista de favoritos guardados, y al hacer clic en uno, cargar esa APOD automáticamente.