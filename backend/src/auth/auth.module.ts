import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserService } from 'src/users/services/user/user.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { CompaniesEntity } from 'src/company/entities/company.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CompaniesEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
