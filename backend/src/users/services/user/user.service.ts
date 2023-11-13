import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';
import { UpdateUserInput } from '../../dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }
  /**Удаляет пользователя из базы данных.
   *
   * @param {number} id - ID пользователя, которого нужно удалить.
   * @return {Promise<number>} Количество затронутых строк в базе данных.
   */
  async removeUser(id: number): Promise<number> {
    // Удаляем пользователя из базы данных
    const result = await this.userRepository.delete({ id });
    // Возвращаем количество затронутых строк
    return result.affected;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput }
    );
    return await this.getUserById(updateUserInput.id);
  }

  /**Получает сущность пользователя на основе его электронной почты.
   *
   * @param {string} email - Электронная почта пользователя.
   * @return {Promise<UserEntity>} Промис, который разрешается в сущность пользователя.
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
