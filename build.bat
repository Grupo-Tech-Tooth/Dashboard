@echo off

echo ==== Removendo pasta dist do build anterior ====
rmdir /S /Q dist || (
  echo Falha ao remover a pasta dist.
  exit /b 1
)

echo ==== Criando um novo build do projeto Vite React ====
npm run build || (
  echo Falha ao criar o build.
  exit /b 1
)

echo ==== Processo concluído com sucesso ====
pause