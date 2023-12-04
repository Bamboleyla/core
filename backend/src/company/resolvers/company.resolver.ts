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
  @Mutation(() => [CompaniesEntity])
  //Защищаем ресурс от пользователей, которых нет в базе
  @UseGuards(JwtAuthGuard)
  async COMPANY_create(
    @Args('data') data: CreateCompanyInput,
    @Context() context
  ): Promise<CompaniesEntity[]> {
    return await this.companyService.create(data, context.req.user.user_id);
  }

  //Получение всех организации, на которые есть у пользователя права
  @Query(() => [CompaniesEntity])
  @UseGuards(JwtAuthGuard)
  async COMPANY_getAll(@Context() context): Promise<CompaniesEntity[]> {
    const result = await this.companyService.getAll(context.req.user.user_id);
    return result;
  }
}
