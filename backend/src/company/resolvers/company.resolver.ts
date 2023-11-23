import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCompanyInput } from '../dto/create-input';
import { CompaniesEntity } from '../entities/company.entities';
import { CompanyService } from '../services/company.service';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Number)
  //Создание новой организации
  async COMPANY_create(
    @Args('data') data: CreateCompanyInput
  ): Promise<number> {
    return await this.companyService.create(data, 1);
  }

  @Query(() => [CompaniesEntity])
  async COMPANY_getAll(): Promise<CompaniesEntity[]> {
    return await this.companyService.getAll();
  }
}
