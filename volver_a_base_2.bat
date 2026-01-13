@echo off
echo Restaurando el proyecto al estado "Base 2" (Commit 8e71a9e)...
git reset --hard 8e71a9e
git clean -fd
echo.
echo ==========================================
echo  SISTEMA RESTAURADO A BASE 2 EXITOSAMENTE
echo ==========================================
pause
