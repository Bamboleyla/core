import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCompanyResponse {
  @Field(() => ID)
  id: number; //Идентификатор компании
}
