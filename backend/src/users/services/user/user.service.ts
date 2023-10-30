import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../inputs/create-user.input';
import { UpdateUserInput } from '../../inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

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

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput }
    );
    return await this.getUserById(updateUserInput.id);
  }
}
