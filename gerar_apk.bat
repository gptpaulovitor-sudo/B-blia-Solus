@echo off
chcp 65001 > nul
title Solus Christus — Gerador de Aplicativo Nativo (APK)

echo ========================================================
echo        SOLUS CHRISTUS — GERADOR DE APP NATIVO (APK)
echo ========================================================
echo.
echo [1/3] Compilando arquivos da aplicacao e textos biblicos...
call npm run build:native
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao compilar os arquivos web/nativos.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Verificando ambiente de compilacao Android (Gradle)...
cd android

if exist gradlew.bat (
    echo Compilando APK nativo independente via Gradle...
    call gradlew.bat assembleDebug
    if %ERRORLEVEL% EQU 0 (
        cd ..
        if not exist "APK_Gerado" mkdir "APK_Gerado"
        copy "android\app\build\outputs\apk\debug\app-debug.apk" "APK_Gerado\Solus_Christus_Instalador.apk" > nul
        echo.
        echo ========================================================
        echo [SUCESSO] APK NATIVO GERADO COM EXITO!
        echo Localizacao: APK_Gerado\Solus_Christus_Instalador.apk
        echo.
        echo Como instalar no celular:
        echo 1. Envie o arquivo 'Solus_Christus_Instalador.apk' para seu celular (via WhatsApp, Telegram, Google Drive ou Cabo USB).
        echo 2. Toque no arquivo no celular e autorize a instalacao.
        echo 3. O aplicativo ficara instalado nativamente sem depender de nenhum site ou internet!
        echo ========================================================
    ) else (
        cd ..
        echo.
        echo [AVISO] O Gradle precisa do Android SDK ou Android Studio instalado no computador para compilar o APK diretamente pela linha de comando.
        echo.
        echo Deseja abrir o projeto no Android Studio agora? (S/N)
        set /p OPCAO=Opcao: 
        if /i "%OPCAO%"=="S" (
            call npx cap open android
        )
    )
) else (
    cd ..
    echo [ERRO] Estrutura da pasta android nao encontrada.
)

echo.
pause
