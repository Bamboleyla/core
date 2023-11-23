import { client } from "@/graphql/client";
import { gql } from "graphql-request";
import { errorHandler } from "../handlers";

export interface ICreateCompany_params {
  type: string; //Тип организации (Физ. лицо, Юр. лицо)
  name: string; //Название организации (ООО "Компания")
  inn: string | null; //ИНН организации
  country: string; //Страна организации
  index: string | null; //Индекс организации
  region: string | null; //Регион в которой находится организация
  district: string | null; //Район в котором находится организация
  city: string | null; //Город в котором находится организация
  settlement: string | null; //Населенный пункт в котором находится организация
  street: string | null; //Улица по которой находится организация
  house: string | null; //Номер дома в котором находится организация
  apartment: string | null; //Номер квартиры в которой находится организация
}

interface ICreateCompany_response {
  COMPANY_create: { id: string };
}

const query = gql`
  mutation COMPANY_create($data: CreateCompanyInput!) {
    COMPANY_create(data: $data)
  }
`;
/**Запрос создает новую организацию и возвращает true если регистрация прошла успешно и false если что-то не так
 *
 * @param params объект с данными для регистрации
 * @returns true если регистрация прошла успешно,false если произошла ошибка
 */
export const COMPANY_create = async (params: ICreateCompany_params) => {
  try {
    //Посылаем запрос
    const result = await client.request<ICreateCompany_response>(query, {
      data: params,
    });
    console.log(result);
    //Всё хорошо
    return true;
  } catch (error: any) {
    console.error(error);
    //Сообщаем о ошибке пользователю
    errorHandler(error, "Ошибка регистрации новой организации");
    //Всё плохо
    return false;
  }
};
