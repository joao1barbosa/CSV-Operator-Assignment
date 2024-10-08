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

# Baixe o script wait-for-it e instale o bash
RUN apk add --no-cache curl bash \
    && curl -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /wait-for-it.sh

# Copie o script init.sh
COPY init.sh /app/init.sh

# Torne o script init.sh executável
RUN chmod +x /app/init.sh

ARG DATABASE_URL

# Passe o argumento como variável de ambiente para o build
ENV DATABASE_URL=$DATABASE_URL

# Instale as dependências necessárias para a execução
RUN yarn install --production

# Gere o cliente Prisma
RUN yarn prisma generate

# Crie a pasta 'uploads'
RUN mkdir -p /app/uploads

# Exponha a porta na qual a aplicação Nest.js vai rodar
EXPOSE 3001

# Comando para iniciar o servidor de produção
CMD ["/wait-for-it.sh", "database:3306", "--", "/app/init.sh"]
