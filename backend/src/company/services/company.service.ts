import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../entities/company.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyInput } from '../dto/create-input';
import { CreateCompanyResponse } from '../dto/create-response';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly companyRepository: Repository<CompaniesEntity>
  ) {}
  /**Метод для создания новой организации
   *
   * @param data данные новой организации
   * @returns ID новой организации
   */
  async create(
    data: CreateCompanyInput,
    userID: number
  ): Promise<CreateCompanyResponse> {
    //1.Создаем новою организацию
    const newCompany = this.companyRepository.create(data);
    //2.Сохраняем новую организацию
    await this.companyRepository.save(newCompany);
    //3.Возвращаем ID новой организации
    return { id: newCompany.id };
  }
}
