# Etapa 1: Construção da Aplicação Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências primeiro para otimizar o cache
COPY package*.json ./
RUN npm install


# Copia o restante do código e constrói a aplicação
COPY . .

RUN npm run build

# Etapa 2: Servindo o Frontend com Nginx
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo principal do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia a configuração do servidor web
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos do frontend para o diretório de publicação do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
