import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCompanyResponse } from '../dto/create-response';
import { CreateCompanyInput } from '../dto/create-input';
import { CompaniesEntity } from '../entities/company.entities';
import { CompanyService } from '../services/company.service';

@Resolver('Company')
export class CompanyResolver {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly companyService: CompanyService
  ) {}

  @Mutation(() => CreateCompanyResponse)
  //Создание новой организации
  async COMPANY_create(
    @Args('data') data: CreateCompanyInput
  ): Promise<CreateCompanyResponse> {
    return await this.companyService.create(data, 1);
  }
}
