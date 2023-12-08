export interface IGetAll_response {
  COMPANY_getAll: {
    id: number; //Идентификатор организации в БД
    name: string; //Название организации
    inn: string; //ИНН организации
  }[];
}

export interface ICreate_response {
  COMPANY_create: {
    id: number; //Идентификатор организации в БД
    name: string; //Название организации
    inn: string; //ИНН организации
  }[];
}
