FROM node AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5000
CMD ["yarn", "start:prod"]