import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from './../services/auth.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { LogInInput } from '../inputs/logIn.inputs';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserEntity)
  async logIn(@Args('LogIn') LogInInput: LogInInput): Promise<UserEntity> {
    return await this.authService.validateUser(LogInInput);
  }
}
