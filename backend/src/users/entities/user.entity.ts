import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
  @Column({ nullable: true })
  //TODO поле не должно иметь null, как это так у тебя пользователи без пароля
  password: string; //Пароль пользователя
}
