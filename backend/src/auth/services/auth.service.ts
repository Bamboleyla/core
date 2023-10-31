import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/users/services/user/user.service';
import { LogInInput } from './../inputs/logIn.inputs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Проверяет пользователя, проверяя его email и пароль.
   *
   * @param {LogInInput} LogInInput - Объект ввода, содержащий email и пароль пользователя.
   * @return {Promise<any>} - Промис, который размешаются данные проверенного пользователя.
   */
  async validateUser(LogInInput: LogInInput): Promise<any> {
    const { email, password } = LogInInput;
    const user = await this.userService.getUserByEmail(email);
    if (!user)
      throw new NotFoundException(
        `Пользователь с email: ${email} не зарегистрирован`
      );

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Неверный пароль');
    return user;
  }
}
