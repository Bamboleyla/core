import { client } from "@/graphql/client";
import { gql } from "graphql-request";
import type { TabsProps } from "antd";

import { errorHandler } from "../handlers";
import {
  ICreate_response,
  IGetAll_response,
  IGetTitlesForTabs_response,
} from "./responses";
import { ICreate_params } from "./params";

class Request {
  /**Запрос на получение всех организаций в которых пользователь является автором
   *
   * @returns Все организации в которых пользователь является автором
   */
  async getAll() {
    const query = gql`
      query COMPANY_getAll {
        COMPANY_getAll {
          id
          name
          inn
        }
      }
    `;
    try {
      return await client.request<IGetAll_response>(query);
    } catch (error) {
      console.error(error);
    }
  }

  /**Запрос на получение заголовков для Tabs с услугами организаций
   *
   * @returns Список заголовков организаций для Tabs
   */
  async getTitlesForTabs(): Promise<TabsProps["items"]> {
    const query = gql`
      query COMPANY_getAll {
        COMPANY_getAll {
          id
          name
        }
      }
    `;
    try {
      //делаем запрос, чтобы получить список названий и идентификаторов организаций пользователя
      const data = await client.request<IGetTitlesForTabs_response>(query);
      //преобразовываем полученные данные в нужный формат для Tabs, затем возвращаем их
      return await data.COMPANY_getAll.map((compony) => ({
        key: compony.id.toString(),
        label: compony.name,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  /**Запрос создает новую организацию и если регистрация прошла успешно, возвращает новый список с организациями, в противном случае false если что-то не так
   *
   * @param params объект с данными для регистрации
   * @returns список организаций(вместе с новой организацией) если регистрация прошла успешно,false если произошла ошибка
   */
  async create(params: ICreate_params) {
    const query = gql`
      mutation COMPANY_create($data: COMPANY_createInput!) {
        COMPANY_create(data: $data) {
          id
          name
          inn
        }
      }
    `;
    try {
      //Посылаем запрос
      const { COMPANY_create } = await client.request<ICreate_response>(query, {
        data: params,
      });
      return COMPANY_create;
    } catch (error: any) {
      console.error(error);
      //Сообщаем о ошибке пользователю
      errorHandler(error, "Ошибка регистрации новой организации");
      //Всё плохо
      return false;
    }
  }
}

export const CompanyGraphql = new Request();
