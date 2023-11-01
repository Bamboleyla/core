import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/users/services/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super();
  }
  /**
   * Метод для входа пользователя, который проверяет его email и пароль, на достоверность
   *
   * @param email почта пользователя
   * @param password пароль пользователя
   * @returns элемент UserEntity
   */
  async validate(email: string, password: string) {
    //Проверяем пользователя, проверяя его email и пароль, на достоверность
    const correct = await this.authService.isTheUserDataCorrect(
      email,
      password
    );
    //Если его данные недостоверны, то выбрасываем ошибку
    if (!correct) {
      throw new UnauthorizedException();
    }
    //Возвращаем пользователя
    return await this.userService.getUserByEmail(email);
  }
}
