import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';
import { CompaniesEntity } from 'src/company/entities/company.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User: Repository<UserEntity>,
    @InjectRepository(CompaniesEntity)
    private readonly Companies: Repository<CompaniesEntity>
  ) {}

  async getUserById(id: number): Promise<UserEntity> {
    return await this.User.findOne({ where: { id } });
  }
  /**Удаляет пользователя из базы данных.
   *
   * @param {number} id - ID пользователя, которого нужно удалить.
   * @return {Promise<number>} Количество затронутых строк в базе данных.
   */
  async removeUser(id: number): Promise<number> {
    const company = await this.Companies.findOne({
      where: { author: { id } },
    } as FindOneOptions<CompaniesEntity>);
    if (company) company.author = null;
    await this.Companies.save(company);
    // Удаляем пользователя из базы данных
    const result = await this.User.delete({ id });
    // Возвращаем количество затронутых строк
    return result.affected;
  }

  /**Получает сущность пользователя на основе его электронной почты.
   *
   * @param {string} email - Электронная почта пользователя.
   * @return {Promise<UserEntity>} Промис, который разрешается в сущность пользователя.
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.User.findOne({ where: { email } });
  }
}
