#!/bin/sh

# Verifique se as migrações foram aplicadas
if [ ! -f /app/migrations-applied ]; then
  echo "Applying database migrations..."
  npx prisma migrate deploy
  touch /app/migrations-applied
fi

# Inicie o servidor
exec node dist/main.js
