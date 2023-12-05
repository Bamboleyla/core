import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entities';
import { ServiceResolver } from './resolvers/services.resolver';
import { ServiceService } from './services/services.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceResolver, ServiceService],
})
export class ServicesModule {}
