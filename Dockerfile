# Используем официальный образ Node.js для сборки
FROM node:20-alpine AS build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

# Собираем проект
RUN npm run build  # Для Vue.js будет использоваться скрипт build из package.json

# Используем лёгкий веб-сервер для сервировки готовых файлов
FROM nginx:alpine

# Копируем собранные файлы в папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
