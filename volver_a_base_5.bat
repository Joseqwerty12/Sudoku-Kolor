@echo off
echo Restaurando el proyecto al estado "Base 5" (Commit 9567a53)...
git reset --hard 9567a53
git clean -fd
echo.
echo ==========================================
echo  SISTEMA RESTAURADO A BASE 5 EXITOSAMENTE
echo  (Incluye: Instrucciones finales + Etiquetas amarillas en botones)
echo ==========================================
pause
