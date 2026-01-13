@echo off
echo Restaurando el proyecto al estado "Base 4" (Commit f69c60c)...
git reset --hard f69c60c
git clean -fd
echo.
echo ==========================================
echo  SISTEMA RESTAURADO A BASE 4 EXITOSAMENTE
echo  (Incluye: Instrucciones finales, arreglo de ventana modal)
echo ==========================================
pause
