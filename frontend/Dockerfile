# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем файлы приложения
COPY /*.json ./
COPY . .

# Собираем приложение
RUN yarn build

# Создаем новый образ
FROM node:20-alpine
WORKDIR /app

# Копируем собранные файлы из образа сборки
COPY --from=builder /app ./
EXPOSE 3000
# Запускаем приложение
CMD ["yarn", "start"]