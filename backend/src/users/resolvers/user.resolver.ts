import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../services/user/user.service';
import { UserEntity } from '../entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Number)
  async USER_remove(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => UserEntity)
  async USER_get(
    @Args('id', { type: () => ID }) id: number
  ): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }
}
