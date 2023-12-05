import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ServiceEntity } from 'src/services/entities/service.entities';

@ObjectType()
@Entity('serviceGroups')
export class ServiceGroupsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number; //Идентификатор дерева групп услуг

  @Field()
  @Column()
  name: string; //Название группы услуг

  @Field(() => [ServiceGroupsEntity, ServiceEntity], { nullable: true })
  children: (ServiceGroupsEntity | ServiceEntity)[];
}
