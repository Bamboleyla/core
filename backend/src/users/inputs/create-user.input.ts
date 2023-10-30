import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength, IsString, Matches } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail(undefined, { message: 'Неправильный формат электронной почты' })
  email: string;

  @Field()
  @MinLength(2, { message: 'Имя не может быть короче двух букв' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Matches(/^[а-яА-Я]+$/, {
    message: 'Имя должно содержать только кириллические символы',
  })
  name: string;
}
