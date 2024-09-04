# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências usando Yarn
RUN yarn install

# Copie o restante do código fonte
COPY . .

# Exponha a porta na qual a aplicação Nest.js vai rodar
EXPOSE 3001

# Comando para iniciar o servidor de desenvolvimento
CMD ["yarn", "start:dev"]
