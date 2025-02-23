#!/bin/sh

NODE_MODULES_DIR="./node_modules"


if [ ! -d "$NODE_MODULES_DIR" ]; then
  echo "Installing dependencies..."
  pnpm install
else 
  echo "Dependencies already installed."
fi  

echo "Running migrations..."
pnpm prisma generate
pnpm prisma migrate deploy

echo "Running seeders..."
pnpm prisma db seed

echo "Starting server..."
pnpm start:dev

