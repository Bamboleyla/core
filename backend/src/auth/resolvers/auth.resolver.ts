import { AuthService } from './../services/auth.service';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LogInResponse } from '../dto/logIn-response';
import { LogInInput } from '../dto/logIn-input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LogInResponse)
  //Защищаем ресурс от пользователей, которых нет в базе
  @UseGuards(LocalAuthGuard)
  /**
   * Вход для получения токена авторизованного пользователя.
   *
   * @param {LogInInput} logInInput - Данные для входа пользователя.
   * @param {Context} context - Контекст запроса, после обработки запроса защитником LocalAuthGuard.
   * @return {Promise<LogInResponse>} Ответ от операции входа.
   */
  async logIn(
    @Args('LogInInput') logInInput: LogInInput,
    @Context() context
  ): Promise<LogInResponse> {
    return await this.authService.getToken(context.user.id);
  }
}
