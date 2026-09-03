@echo off
echo ========================================================
echo   Iniciando Solus Christus (Biblia de Estudo)
echo ========================================================
echo.
echo Abrindo o aplicativo em http://localhost:3000 ...
start http://localhost:3000
echo.
cmd /c npm.cmd run dev
pause
