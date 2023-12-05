import { Query, Resolver } from '@nestjs/graphql';
import { ServicesGroupService } from '../services/serviceGroups.service';
import { ServiceGroupsEntity } from '../entities/serviceGroups.entity';

@Resolver()
export class ServiceGroupsResolver {
  constructor(private readonly GroupsService: ServicesGroupService) {}
  @Query(() => [ServiceGroupsEntity])
  async SERVICE_GROUPS_getAll(): Promise<ServiceGroupsEntity[]> {
    return await this.GroupsService.getAll();
  }
}
