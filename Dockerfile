# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходники
COPY . .

# Собираем проект (если у тебя TypeScript, Webpack и т.п.)
RUN npm run build

# Порт, который приложение будет слушать
EXPOSE 3000

# Команда запуска (замени на своё, если нужно)
CMD ["node", "dist/main.js"]
