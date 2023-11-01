import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../dto/create-user.input';
import { UpdateUserInput } from '../../dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  /**
   * Метод для создания нового пользователя
   *
   * @param createUserInput объект, содержащий информацию о новом пользователе
   * @returns данные о созданном пользователе
   */
  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    //1.Прежде чем создать нового пользователя, проверяем, существует ли уже пользователь с таким email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });
    //Если пользователь с таким email уже существует, то выбрасываем ошибку
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует'
      );
    }
    //2.Хэшируем пароль
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    //3.Создаем нового пользователя
    const newUser = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }
  /**
   * Удаляет пользователя из базы данных.
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

  /**
   * Получает сущность пользователя на основе его электронной почты.
   *
   * @param {string} email - Электронная почта пользователя.
   * @return {Promise<UserEntity>} Промис, который разрешается в сущность пользователя.
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
