@echo off
echo ========================================================
echo   Publicando Solus Christus na Web (Firebase Hosting)
echo ========================================================
echo.
echo 1. Compilando aplicacao...
call npm.cmd run build
echo.
echo 2. Publicando na nuvem do Google (Firebase Hosting)...
call npx -y firebase-tools deploy --only hosting
echo.
echo Se o deploy foi concluido com sucesso, seu app estara disponivel em:
echo https://biblia-online-8bce0.web.app
echo ========================================================
pause
