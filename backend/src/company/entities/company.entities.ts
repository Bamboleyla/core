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

  @Field()
  @Column()
  name: string; //Название компании
}
