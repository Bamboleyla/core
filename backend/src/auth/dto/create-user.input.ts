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

  @Field()
  @MinLength(8, { message: 'Пароль должен содержать не менее 8 символов' })
  @Matches(/[A-Z]/, {
    message: 'Пароль должен содержать хотя бы одну заглавную букву',
  })
  @Matches(/[a-z]/, {
    message: 'Пароль должен содержать хотя бы одну строчную букву',
  })
  @Matches(/[0-9]/, {
    message: 'Пароль должен содержать хотя бы одну цифру',
  })
  @Matches(/[!@#$%^&*]/, {
    message: 'Пароль должен содержать хотя бы один специальный символ !@#$%^&*',
  })
  @Matches(/^[A-Za-z0-9!@#$%^&*]*$/, {
    message: 'Пароль не может содержать нелатинские символы',
  })
  password: string;
}
