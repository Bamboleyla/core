# Dockerfile
FROM node AS builder
WORKDIR /app

# Копируем файлы приложения
COPY /*.json ./
COPY . .

# Собираем приложение
RUN yarn build

# Создаем новый образ
FROM node
WORKDIR /app

# Копируем собранные файлы из образа сборки
COPY --from=builder /app ./
EXPOSE 5000
# Запускаем приложение
CMD ["yarn", "start:prod"]