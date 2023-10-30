import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export enum Role {
  owner, //Владелец
  admin, //Администратор
  master, //Мастер
}

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number; //Идентификатор пользователя

  @Field()
  @CreateDateColumn()
  createdAt: Date; //Дата создания пользователя

  @Field()
  @UpdateDateColumn()
  updatedAt: Date; //Дата обновления пользователя

  @Field()
  @Column()
  email: string; //Электронная почта пользователя

  @Field()
  @Column()
  name: string; //Имя пользователя

  @Field({ nullable: true })
  @Column({ type: 'enum', enum: Role, nullable: true })
  role: Role | null; //Роль пользователя, может быть null в таком случае, если роль пользователя еще не назначена
}
