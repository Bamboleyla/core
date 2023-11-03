import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/users/services/user/user.service';
import { LogInResponse } from '../dto/logIn-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Проверяет пользователя, на присутствие в базе данных и совпадение пароля.
   *
   * @param {LogInInput} LogInInput - Объект ввода, содержащий email и пароль пользователя.
   * @return {Promise<boolean>} - Промис, который разрешается в булевое значение.Если пользователь индифицирован в базе, то вернет true
   */
  async isTheUserDataCorrect(
    email: string,
    password: string
  ): Promise<boolean> {
    //1.Ищем пользователя по email
    const user = await this.userService.getUserByEmail(email);
    //2.Если пользователь не найден, то выбрасываем ошибку
    if (!user)
      throw new BadRequestException(
        'Электронная почта или пароль введены неверно'
      );
    //3.Если пароли не совпадают, то выбрасываем ошибку
    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException(
        'Электронная почта или пароль введены неверно'
      );
    //4.Возвращаем пользователя
    return true;
  }
  /**
   * Возвращает JWT-токен доступа для пользователя после успешной авторизации.
   *
   * @param {UserEntity} user - Объект пользователя, содержащий email и пароль.
   * @return {Promise<LogInResponse>} - Промис, который разрешается в объект LogInResponse, содержащий токен доступа.
   */
  async getToken(id: number): Promise<LogInResponse> {
    const payload = { user_id: id }; //В токене будет храниться только id пользователя
    return { access_token: this.jwtService.sign(payload) };
  }
}
