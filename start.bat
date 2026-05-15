@echo off
echo Iniciando o banco de dados...
docker start mifortuna-db

timeout /t 10 >nul

echo Iniciando o backend...
start cmd /k "cd backend\mifortuna-back && npm run start:dev"

timeout /t 5 >nul

echo Iniciando o frontend...
start cmd /k "cd frontend\mifortuna-front && npm run dev"

echo Tudo rodando!

