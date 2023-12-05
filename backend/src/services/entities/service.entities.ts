import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('services')
export class ServiceEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number; //Идентификатор услуги

  @Field()
  @Column()
  name: string; //Название услуги

  @Field()
  @Column()
  price: string; //Название цена услуги
}
