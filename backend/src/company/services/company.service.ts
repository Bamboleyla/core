import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyInput } from '../dto/create-input';
import { CompaniesEntity } from '../entities/company.entities';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private readonly Companies: Repository<CompaniesEntity>,
    @InjectRepository(UserEntity)
    private readonly Users: Repository<UserEntity>
  ) {}
  /**Метод для создания новой организации
   *
   * @param data данные новой организации
   * @returns список всех организации, где пользователь является автором
   */
  async create(
    data: CreateCompanyInput,
    userID: number
  ): Promise<CompaniesEntity[]> {
    /*Алгоритм:
    1.Для создания новой организации нужно создать автора, это пользователь из таблицы users, который создал организацию
    2.Нужно создать свойство staff, в котором будут храниться сотрудники организации. Свойство это системное и по этому не приходит в графе
    3.Создать новую организацию с добавлением автора и staff, сохраняем в базу
    4.Возвращаем список всех организации, где присутствует пользователь в качестве автора
    */
    //1. Создаем автора
    const author = await this.Users.findOne({ where: { id: userID } });
    //2. Создаем свойство staff
    const staff = {
      owner: [], //Список основателей
      accountant: [], //Список бухгалтеров
      administrators: [], //Список администраторов
      masters: [], //Список мастеров
    };
    //3. Создаем новою организацию
    const newCompany = this.Companies.create({
      ...data,
      staff,
      author, //Идентификатор пользователя который создал новую организацию
    });

    //3.1. Сохраняем новую организацию
    await this.Companies.save(newCompany);

    //4. Возвращаем новый список организации где присутствует пользователь в качестве автора
    return await this.getAll(userID);
  }
  /**Метод для получения всех организации
   *
   * @returns Массив всех организации
   */
  async getAll(userID: number): Promise<CompaniesEntity[]> {
    return await this.Companies.createQueryBuilder('company')
      .leftJoinAndSelect('company.author', 'author')
      .where('author.id = :userID', { userID })
      .getMany();
  }
}
