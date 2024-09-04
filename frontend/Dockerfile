# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Instale dependências adicionais
RUN apk add --no-cache libc6-compat

# Copie o package.json e o yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências usando Yarn
RUN yarn install

# Copie o restante do código fonte
COPY . .

# Exponha a porta na qual a aplicação Next.js vai rodar
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["yarn", "dev"]