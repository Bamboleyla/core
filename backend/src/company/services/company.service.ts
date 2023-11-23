import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyInput } from '../dto/create-input';
import { CompaniesEntity } from '../entities/company.entities';

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
  async create(data: CreateCompanyInput, userID: number): Promise<number> {
    //1.Создаем новою организацию
    const newCompany = this.companyRepository.create(data);
    //2.Сохраняем новую организацию
    await this.companyRepository.save(newCompany);
    //3.Возвращаем ID новой организации
    return newCompany.id;
  }
  /**Метод для получения всех организации
   *
   * @returns Массив всех организации
   */
  async getAll(): Promise<CompaniesEntity[]> {
    return await this.companyRepository.find();
  }
}
