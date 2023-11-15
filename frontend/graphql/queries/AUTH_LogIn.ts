import { client } from "@/graphql/client";
import { gql } from "graphql-request";
import { errorHandler } from "../handlers";

export interface ILogIn_params {
  email: string;
  password: string;
}

interface ILogIn_response {
  AUTH_logIn: { access_token: string };
}

const query = gql`
  query logIn($params: LogInInput!) {
    AUTH_logIn(LogInInput: $params) {
      access_token
    }
  }
`;
/**Запрос на авторизацию пользователя
 *
 * @param params объект с данными для авторизации
 * @returns true если авторизация прошла успешно,false если произошла ошибка
 */
export const AUTH_logIn = async (params: ILogIn_params) => {
  try {
    //Посылаем запрос
    const { AUTH_logIn } = await client.request<ILogIn_response>(query, {
      params,
    });
    //Сохраняем токен
    localStorage.setItem("access_token", AUTH_logIn.access_token);
    //Всё хорошо
    return true;
  } catch (error: any) {
    //Сообщаем о ошибке пользователю
    errorHandler(error, "Ошибка авторизации");
    //Всё плохо
    return false;
  }
};
