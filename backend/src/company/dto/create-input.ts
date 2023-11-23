import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field()
  @IsIn(['Юр. лицо', 'Физ. лицо'], {
    message: 'Тип должен быть "Юр. лицо" или "Физ. лицо"',
  })
  type: string; //Тип организации (Физ. лицо, Юр. лицо)

  @Field()
  @IsNotEmpty({ message: 'Поле "name" не может быть пустым' })
  name: string; //Название организации (ООО "Компания")

  @Field({ nullable: true })
  @Length(10, 10, { message: 'ИНН должен содержать 10 цифр' })
  inn: string | null; //ИНН организации

  @Field()
  @IsIn(['Россия'], { message: 'Указана неправильная страна' })
  country: string; //Страна организации

  @Field({ nullable: true })
  index: string | null; //Индекс организации

  @Field({ nullable: true })
  region: string | null; //Регион в которой находится организация

  @Field({ nullable: true })
  district: string | null; //Район в котором находится организация

  @Field({ nullable: true })
  city: string | null; //Город в котором находится организация

  @Field({ nullable: true })
  settlement: string | null; //Населенный пункт в котором находится организация

  @Field({ nullable: true })
  street: string | null; //Улица по которой находится организация

  @Field({ nullable: true })
  house: string | null; //Номер дома в котором находится организация

  @Field({ nullable: true })
  apartment: string | null; //Номер квартиры в которой находится организация
}
