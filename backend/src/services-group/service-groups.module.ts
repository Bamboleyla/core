import { Module } from '@nestjs/common';
import { ServicesService } from './services/servicesGroup.service';
import { ServicesResolver } from './resolvers/servicesGroup.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceGroupsEntity } from './entities/servicesGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceGroupsEntity])],
  providers: [ServicesService, ServicesResolver],
})
export class ServicesGroupModule {}
