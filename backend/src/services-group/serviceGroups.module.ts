import { Module } from '@nestjs/common';
import { ServiceGroupsResolver } from './resolvers/serviceGroups.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceGroupsEntity } from './entities/serviceGroups.entity';
import { ServiceEntity } from 'src/services/entities/service.entities';
import { ServicesGroupService } from './services/serviceGroups.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceGroupsEntity, ServiceEntity])],
  providers: [ServiceGroupsResolver, ServicesGroupService],
})
export class ServiceGroupsModule {}
