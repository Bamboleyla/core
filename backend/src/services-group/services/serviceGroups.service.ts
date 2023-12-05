import { Injectable } from '@nestjs/common';
import { ServiceGroupsEntity } from '../entities/serviceGroups.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesGroupService {
  constructor(
    @InjectRepository(ServiceGroupsEntity)
    private readonly ServiceGroups: Repository<ServiceGroupsEntity>
  ) {}
  async getAll(): Promise<ServiceGroupsEntity[]> {
    return await this.ServiceGroups.find();
  }
}
