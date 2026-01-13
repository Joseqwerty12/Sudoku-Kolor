@echo off
echo Restaurando el proyecto al estado "Base 3" (Commit 2078f58)...
git reset --hard 2078f58
git clean -fd
echo.
echo ==========================================
echo  SISTEMA RESTAURADO A BASE 3 EXITOSAMENTE
echo  (Incluye: Slogan nuevo, sin boton instrucciones, sin sombras)
echo ==========================================
pause
