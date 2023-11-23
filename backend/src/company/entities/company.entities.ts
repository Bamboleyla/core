import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('companies')
export class CompaniesEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number; //Идентификатор компании

  @Field()
  @CreateDateColumn()
  createdAt: Date; //Дата создания

  @Field()
  @UpdateDateColumn()
  updatedAt: Date; //Дата обновления

  // @Field()
  // @Column()
  // author: string; //Идентификатор пользователя который создал новую организацию

  @Field()
  @Column()
  type: string; //Тип организации (Физ. лицо, Юр. лицо)

  @Field()
  @Column()
  name: string; //Название организации (ООО "Компания")

  @Field()
  @Column({ nullable: true })
  inn: string | null; //ИНН организации

  @Field()
  @Column({ nullable: true })
  country: string | null; //Страна организации

  @Field()
  @Column({ nullable: true })
  index: string | null; //Индекс организации

  @Field()
  @Column({ nullable: true })
  region: string | null; //Регион в которой находится организация

  @Field()
  @Column({ nullable: true })
  district: string | null; //Район в котором находится организация

  @Field()
  @Column({ nullable: true })
  city: string | null; //Город в котором находится организация

  @Field()
  @Column({ nullable: true })
  settlement: string | null; //Населенный пункт в котором находится организация

  @Field()
  @Column({ nullable: true })
  street: string | null; //Улица по которой находится организация

  @Field()
  @Column({ nullable: true })
  house: string | null; //Номер дома в котором находится организация

  @Field()
  @Column({ nullable: true })
  apartment: string | null; //Номер квартиры в которой находится организация
}
