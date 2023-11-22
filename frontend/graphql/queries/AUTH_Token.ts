import { client } from "@/graphql/client";
import { gql } from "graphql-request";

interface IAuth_response {
  AUTH_token: boolean;
}

const query = gql`
  query AUTH_token{
    AUTH_token
   }
  }
`;
//Запрос на проверку авторизации пользователя, если токен валидный, то вернет true. Если нет, то вернется ошибка
export const AUTH_token = async () => {
  try {
    //Посылаем запрос
    await client.request<IAuth_response>(query);
    //Всё хорошо
    return true;
  } catch (error: any) {
    //Всё плохо, токен не действителен или отсутствует
    return false;
  }
};
