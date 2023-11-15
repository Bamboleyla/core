import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:5000/graphql";
//Создаем клиент для отправки запросов
export const client = new GraphQLClient(endpoint);
//Проверяем наличие локального хранилища(бывает что локальное хранилище отсутствует), если есть то берем токен
const token =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("access_token")
    : null;
//Если токен есть то добавляем его в заголовок
token && client.setHeader("Authorization", `Bearer ${token}`);
