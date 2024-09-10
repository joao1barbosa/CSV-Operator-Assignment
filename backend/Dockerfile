# Use uma imagem base do Node.js
FROM node:18-alpine AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências usando Yarn
RUN yarn install

# Copie o restante do código fonte
COPY . .

# Compile o código TypeScript para JavaScript
RUN yarn build

# Use uma imagem base menor para a fase final
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie apenas o build da fase de construção
COPY --from=builder /app/dist /app/dist

# Copie o package.json e o yarn.lock para a nova imagem
COPY package.json yarn.lock ./

# Copie a pasta prisma necessária para a aplicação
COPY --from=builder /app/prisma /app/prisma

# Instale as dependências necessárias para a execução
RUN yarn install --production

# Gere o cliente Prisma
RUN yarn prisma generate

# Crie a pasta 'uploads'
RUN mkdir -p /app/uploads

# Exponha a porta na qual a aplicação Nest.js vai rodar
EXPOSE 3001

# Comando para iniciar o servidor de produção
CMD ["node", "dist/main.js"]
