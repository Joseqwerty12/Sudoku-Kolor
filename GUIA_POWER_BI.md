# Guía para crear tu Informe en Power BI

He extraído los datos de tu imagen y los he guardado en el archivo `datos_proyectos.csv` en esta misma carpeta. Sigue estos pasos para crear un informe de alto impacto.

## 1. Cargar Datos
1. Abre Power BI Desktop.
2. Haz clic en **Obtener datos** -> **Texto/CSV**.
3. Selecciona el archivo `datos_proyectos.csv`.
4. En la vista previa, asegura que las columnas `% Avance` y `Distribución en Tiempo` se detecten como números decimales.

## 2. Modelado y Medidas DAX
Para obtener insights valiosos, crea una nueva tabla de medidas (o añádelas a tu tabla principal) con las siguientes fórmulas DAX:

**Progreso Ponderado (Importante para ver el avance real global)**
```dax
% Avance Global Ponderado = 
DIVIDE(
    SUMX('datos_proyectos', 'datos_proyectos'[Sucursales o Recintos] * 'datos_proyectos'[% Avance]),
    SUM('datos_proyectos'[Sucursales o Recintos]),
    0
)
```

**Total de Sucursales/Sitios**
```dax
Total Sitios = SUM('datos_proyectos'[Sucursales o Recintos])
```

**Estado del Proyecto (Texto Dinámico)**
```dax
Estado Resumen = 
VAR Completados = CALCULATE(COUNTROWS('datos_proyectos'), 'datos_proyectos'[% Avance] = 1)
VAR EnCurso = CALCULATE(COUNTROWS('datos_proyectos'), 'datos_proyectos'[% Avance] < 1 && 'datos_proyectos'[% Avance] > 0)
RETURN
"Activos: " & EnCurso & " | Finalizados: " & Completados
```

## 3. Visualizaciones Sugeridas

### Panel Superior (KPIs)
Usa tarjetas (Cards) modernas para mostrar los números grandes:
*   **Total Sitios**: (Usa la medida creada)
*   **% Avance Global**: (Usa la medida ponderada, formato %)
*   **Total Proyectos**: (Recuento de 'Item')

### Gráfico Principal: Avance por Proyecto
*   **Tipo**: Gráfico de barras horizontales (Bar Chart).
*   **Eje Y**: `Item` (Nombre del proyecto).
*   **Eje X**: `% Avance`.
*   **Leyenda/Color**: Puedes usar formato condicional en las barras:
    *   Verde si > 80%
    *   Amarillo si > 40%
    *   Rojo si < 40%

### Matriz de Detalle
Para ver el detalle fino que tenías en la imagen:
*   Usa una **Matriz**.
*   Filas: `Jefe de Proyecto`, `Item`.
*   Valores: `Sucursales`, `% Avance` (con formato de barra de datos), `Estado`.

### Segmentadores (Filtros)
Añade filtros a la izquierda o arriba para:
*   `SubGerente`
*   `BO Despliegue`
*   `Estado`

## 4. Estilo (Design Aesthetics)
Para que el reporte se vea profesional y moderno:
*   **Fondo**: Usa un gris muy claro (#F3F4F6) o un modo oscuro (#111827) con tarjetas flotantes blancas/oscuras.
*   **Bordes**: Añade bordes redondeados (10px) y sombras suaves a tus gráficos.
*   **Títulos**: Usa fuente **Segoe UI Semibold** o **DIN** en tamaño 12-14px para los títulos de los gráficos.
