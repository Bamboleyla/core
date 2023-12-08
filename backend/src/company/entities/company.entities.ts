import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { StaffMembers } from './staffMembers.entities';
import { ServiceGroupsEntity } from 'src/services-group/entities/serviceGroups.entity';
import { ServiceEntity } from 'src/services/entities/service.entities';

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

  @Field()
  @ManyToOne(() => UserEntity)
  author: UserEntity; //Пользователь который создал новую организацию

  @Field()
  @Column()
  type: string; //Тип организации (Физ. лицо, Юр. лицо)

  @Field()
  @Column()
  name: string; //Название организации (ООО "Компания")

  @Field({ nullable: true })
  @Column({ nullable: true })
  inn: string | null; //ИНН организации

  @Field()
  @Column()
  country: string; //Страна организации

  @Field({ nullable: true })
  @Column({ nullable: true })
  index: string | null; //Индекс организации

  @Field({ nullable: true })
  @Column({ nullable: true })
  region: string | null; //Регион в которой находится организация

  @Field({ nullable: true })
  @Column({ nullable: true })
  district: string | null; //Район в котором находится организация

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string | null; //Город в котором находится организация

  @Field({ nullable: true })
  @Column({ nullable: true })
  settlement: string | null; //Населенный пункт в котором находится организация

  @Field({ nullable: true })
  @Column({ nullable: true })
  street: string | null; //Улица по которой находится организация

  @Field({ nullable: true })
  @Column({ nullable: true })
  house: string | null; //Номер дома в котором находится организация

  @Field({ nullable: true })
  @Column({ nullable: true })
  apartment: string | null; //Номер квартиры в которой находится организация

  @Column({ type: 'json' })
  @Field(() => StaffMembers)
  staff: StaffMembers; //Сотрудники в организации

  @Field(() => [ServiceGroupsEntity], { nullable: true, defaultValue: [] })
  services: ServiceGroupsEntity[] | ServiceEntity[]; //Дерево предоставляемых услуг в организации
}
