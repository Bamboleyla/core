import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { ManyToOne } from 'typeorm';

@ObjectType()
export class StaffMembers {
  //Сотрудники организации
  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity)
  owner: UserEntity[]; //Собственники организации

  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity)
  accountant: UserEntity[]; //Бухгалтера организации

  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity)
  administrators: UserEntity[]; //Администраторы организации

  @Field(() => [UserEntity])
  @ManyToOne(() => UserEntity)
  masters: UserEntity[]; //Мастера организации
}
