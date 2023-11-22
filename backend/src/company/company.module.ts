import { Module } from '@nestjs/common';
import { CompaniesEntity } from './entities/company.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity])],
})
export class CompanyModule {}
