import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LogInResponse } from '../dto/logIn-response';
import { LogInInput } from '../dto/logIn-input';
import { CreateUserInput } from '../dto/create-user.input';
import { AuthService } from './../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LogInResponse)
  //Защищаем ресурс от пользователей, которых нет в базе
  @UseGuards(LocalAuthGuard)
  /**Вход для получения токена авторизованного пользователя.
   *
   * @param {LogInInput} logInInput - Данные для входа пользователя.
   * @param {Context} context - Контекст запроса, после обработки запроса защитником LocalAuthGuard.
   * @return {Promise<LogInResponse>} Ответ от операции входа.
   */
  async AUTH_logIn(
    @Args('LogInInput') logInInput: LogInInput,
    @Context() context
  ): Promise<LogInResponse> {
    return await this.authService.getToken(context.user.id);
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  /** Проверка токена пользователя, если токен валидный, то вернет true. Если нет, то @UseGuards(JwtAuthGuard) выбросит ошибку.
   * @return {Promise<boolean>}
   */
  async AUTH_token(): Promise<boolean> {
    return true;
  }

  @Mutation(() => LogInResponse)
  //Вход для создания нового пользователя и получения токена авторизованного пользователя.
  async AUTH_createUser(
    @Args('createUser') createUserInput: CreateUserInput
  ): Promise<LogInResponse> {
    return await this.authService.createUser(createUserInput);
  }
}
