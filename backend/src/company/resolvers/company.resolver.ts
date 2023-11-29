import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateCompanyInput } from '../dto/create-input';
import { CompaniesEntity } from '../entities/company.entities';
import { CompanyService } from '../services/company.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver('Company')
export class CompanyResolver {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly Companies: Repository<CompaniesEntity>,
    private readonly companyService: CompanyService
  ) {}

  //Создание новой организации
  @Mutation(() => Number)
  //Защищаем ресурс от пользователей, которых нет в базе
  @UseGuards(JwtAuthGuard)
  async COMPANY_create(
    @Args('data') data: CreateCompanyInput,
    @Context() context
  ): Promise<number> {
    return await this.companyService.create(data, context.req.user.user_id);
  }
  //Удаление всех организации
  @Mutation(() => Boolean)
  async COMPANY_removeAll(): Promise<boolean> {
    return await this.companyService.removeAll();
  }
  //Получение всех организации
  @Query(() => [CompaniesEntity]) //TODO Служебный запрос, незащищенный
  async SUPPORT_getAllCompanies(): Promise<CompaniesEntity[]> {
    return await this.Companies.find();
  }
  //Получение всех организации, на которые есть у пользователя права
  @Query(() => [CompaniesEntity]) //TODO Служебный запрос, незащищенный
  @UseGuards(JwtAuthGuard)
  async COMPANY_getAll(@Context() context): Promise<CompaniesEntity[]> {
    const result = await this.companyService.getAll(context.req.user.user_id);
    return result;
  }
}
