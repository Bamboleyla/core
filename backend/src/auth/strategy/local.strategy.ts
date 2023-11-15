import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/users/services/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    //По умолчанию защитник ожидает свойство usernameField в настройках passport, но для нашего удобства мы будем использовать email
    super({
      usernameField: 'email',
    });
  }
  /**
   * Метод для входа пользователя, который проверяет его email и пароль, на достоверность
   *
   * @param email почта пользователя
   * @param password пароль пользователя
   * @returns элемент UserEntity
   */
  async validate(email: string, password: string) {
    //Проверяем пользователя, проверяя его email и пароль, на достоверность, если они недостоверны, то метод выбрасывает ошибку
    await this.authService.isTheUserDataCorrect(email, password);
    //Возвращаем пользователя
    return await this.userService.getUserByEmail(email);
  }
}
