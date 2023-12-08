import { client } from "@/graphql/client";
import { gql } from "graphql-request";
import { ICreateUser_params, ILogIn_params } from "./params";
import {
  ICreateUser_response,
  IGetToken_response,
  ILogIn_response,
} from "./responses";
import { errorHandler } from "../handlers";

class Request {
  /**Запрос регистрирует нового пользователя и возвращает токен
   *
   * @param params объект с данными для регистрации
   * @returns true если регистрация прошла успешно,false если произошла ошибка
   */
  async createUser(params: ICreateUser_params) {
    const query = gql`
      mutation AUTH_createUser($createUser: CreateUserInput!) {
        AUTH_createUser(createUser: $createUser) {
          access_token
        }
      }
    `;
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
  }

  /**Запрос на авторизацию пользователя
   *
   * @param params объект с данными для авторизации
   * @returns true если авторизация прошла успешно,false если произошла ошибка
   */
  async logIn(params: ILogIn_params) {
    const query = gql`
      query logIn($params: LogInInput!) {
        AUTH_logIn(LogInInput: $params) {
          access_token
        }
      }
    `;
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
  }

  /**Запрос на проверку авторизации пользователя, если токен валидный, то вернет true. Если нет, то вернется ошибка
   *
   * @returns true если авторизация прошла успешно,false если произошла ошибка
   */
  getToken = async () => {
    const query = gql`
  query AUTH_token{
    AUTH_token
   }
  }
`;
    try {
      //Посылаем запрос
      await client.request<IGetToken_response>(query);
      //Всё хорошо
      return true;
    } catch (error) {
      //Всё плохо, токен не действителен или отсутствует
      return false;
    }
  };
}

export const AuthGraphql = new Request();
