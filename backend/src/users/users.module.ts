import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { CompaniesEntity } from 'src/company/entities/company.entities';
import { UserService } from './services/user/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { UsersService } from './services/users/users.service';
import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([CompaniesEntity]),
  ],
  providers: [UserService, UsersService, UserResolver, UsersResolver],
  exports: [UserService],
})
export class UsersModule {}
