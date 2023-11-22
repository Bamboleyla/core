import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CompaniesEntity } from 'src/company/entities/company.entities';

interface IServiceGroup {
  key: number;
  name: string;
  children?: IServiceGroup[];
}

const defaultServiceGroup: IServiceGroup = {
  key: 0,
  name: '',
  children: [],
};

@ObjectType()
class GraphQLServiceGroup implements IServiceGroup {
  @Field()
  key: number;

  @Field()
  name: string;

  @Field(() => [GraphQLServiceGroup], { nullable: true })
  children?: IServiceGroup[];
}

@ObjectType()
@Entity('serviceGroups')
export class ServiceGroupsEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number; //Идентификатор дерева групп услуг

  @Field()
  @CreateDateColumn()
  createdAt: Date; //Дата создания пользователя

  @Field()
  @UpdateDateColumn()
  updatedAt: Date; //Дата обновления пользователя

  // @Column({ type: 'json', default: () => defaultServiceGroup })
  // @Field(() => GraphQLServiceGroup)
  // serviceGroup: IServiceGroup; //Дерево групп услуг

  @Field()
  @Column()
  @ManyToOne(() => CompaniesEntity, { eager: true })
  @JoinColumn({ name: 'componyID', referencedColumnName: 'id' })
  componyID: string; // Идентификатор компании
}
