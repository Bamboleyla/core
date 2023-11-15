import { client } from "@/graphql/client";
import { gql } from "graphql-request";
import { errorHandler } from "../handlers";

export interface ICreateUser_params {
  email: string;
  password: string;
  name: string;
}

interface ICreateUser_response {
  AUTH_createUser: { access_token: string };
}

const query = gql`
  mutation AUTH_createUser($createUser: CreateUserInput!) {
    AUTH_createUser(createUser: $createUser) {
      access_token
    }
  }
`;
/**Запрос регистрирует нового пользователя и возвращает токен
 *
 * @param params объект с данными для регистрации
 * @returns true если регистрация прошла успешно,false если произошла ошибка
 */
export const AUTH_createUser = async (params: ICreateUser_params) => {
  try {
    //Посылаем запрос
    const { AUTH_createUser } = await client.request<ICreateUser_response>(
      query,
      {
        createUser: params,
      }
    );
    //Сохраняем токен
    localStorage.setItem("access_token", AUTH_createUser.access_token);
    //Всё хорошо
    return true;
  } catch (error: any) {
    //Сообщаем о ошибке пользователю
    errorHandler(error, "Ошибка регистрации");
    //Всё плохо
    return false;
  }
};
