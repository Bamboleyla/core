import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesEntity } from './entities/company.entities';
import { CompanyService } from './services/company.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity, UserEntity])],
  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule {}
