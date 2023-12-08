export interface ICreate_params {
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
