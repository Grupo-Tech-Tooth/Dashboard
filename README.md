
# 📦 Manual de Instalação — Dashboard (React.js)

## ✅ Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes softwares instalados:

- [Node.js (v16+)](https://nodejs.org/)
- [Docker](https://www.docker.com/) *(opcional, mas recomendado)*

## 🚀 Como rodar o projeto localmente

### 1. Clone este repositório ou descompacte o `.zip`

```bash
git clone <URL-do-repositório>
cd Dashboard-main
```

Ou apenas extraia o arquivo `Dashboard-main.zip`.

### 2. Instale as dependências

Com o terminal aberto na pasta raiz do projeto:

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm start
```

O React irá iniciar a aplicação e abrir automaticamente no navegador em:

```
http://localhost:3000
```

## 🐳 Rodando com Docker (opcional)

Você também pode executar a aplicação usando Docker.

### 1. Build da imagem

```bash
docker build -t dashboard-app .
```

### 2. Subir os containers

```bash
docker-compose up
```

O serviço será exposto em:

```
http://localhost
```

Você pode ajustar portas e variáveis no arquivo `docker-compose.yml` ou `Dockerfile` conforme necessário.

## 🗂️ Estrutura do Projeto

```
Dashboard-main/
├── public/              # HTML principal
├── src/                 # Código-fonte React
│   ├── components/      # Componentes reutilizáveis
│   ├── assets/          # Imagens e ícones
│   ├── App.js           # Componente principal
│   └── index.js         # Ponto de entrada
├── Dockerfile           # Imagem Docker
├── docker-compose.yml   # Orquestração Docker
├── package.json         # Dependências e scripts
└── README.md
```

## 🧠 Scripts úteis

| Comando             | Descrição                         |
|---------------------|-----------------------------------|
| `npm start`         | Inicia o servidor de desenvolvimento |
| `npm run build`     | Gera a versão de produção          |
| `npm test`          | Executa os testes (se configurado) |
