# --- 1. Statikus React build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Függőségek másolása
COPY package.json ./
COPY package-lock.json ./
RUN npm ci 

# Kód másolása
COPY . .

# build mappa létrehozása
RUN npm run build 

# --- 2. NGINX webszerver létrehozása ---
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80