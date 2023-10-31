import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  /**
   * Получает всех пользователей из репозитория пользователей.
   *
   * @return {Promise<UserEntity[]>} Массив объектов UserEntity, представляющих всех пользователей.
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
