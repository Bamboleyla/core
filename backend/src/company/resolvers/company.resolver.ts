import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCompanyInput } from '../dto/create-input';
import { CompaniesEntity } from '../entities/company.entities';
import { CompanyService } from '../services/company.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

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
  @Query(() => [CompaniesEntity])
  async COMPANY_getAll(): Promise<CompaniesEntity[]> {
    return await this.companyService.getAll();
  }
}
