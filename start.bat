@echo off
echo Iniciando Mi Fortuna...

echo.
echo [1/4] Matando processos antigos nas portas 4000 e 4001 (backend e frontend do Mi Fortuna)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":4000.*LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":4001.*LISTENING"') do taskkill /F /PID %%a >nul 2>&1

echo.
echo [2/4] Subindo o banco de dados do Mi Fortuna na porta 5433 (clinix pode ficar rodando na 5432)...
docker compose up db -d

echo Aguardando o Postgres ficar pronto...
timeout /t 8 >nul

echo.
echo [3/4] Iniciando o backend...
start cmd /k "cd backend\mifortuna-back && npm run start:dev"

timeout /t 5 >nul

echo.
echo [4/4] Iniciando o frontend...
start cmd /k "cd frontend\mifortuna-front && npm run dev"

echo.
echo Tudo rodando!

