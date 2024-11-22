@echo off

echo ==== Removendo containers antigos ====
docker-compose down --rmi all || (
  echo Falha ao remover os containers.
  exit /b 1
)

echo ==== Executando Docker Compose com build ====
docker-compose up --build -d || (
  echo Falha ao executar o Docker Compose.
  exit /b 1
)

echo ==== Mudando o nome da imagem Docker ====
docker tag site-oi-sorria-app marcosfloriano/dashboard:latest || (
  echo Falha ao renomear a imagem.
  exit /b 1
)

echo ==== Realizando push da imagem para o Docker Hub ====
docker push marcosfloriano/dashboard:latest || (
  echo Falha ao realizar o push da imagem.
  exit /b 1
)

echo ==== Processo concluído com sucesso ====
pause