import { Query, Resolver } from '@nestjs/graphql';

import { UserEntity } from '../entities/user.entity';
import { UsersService } from './../services/users/users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }
}
