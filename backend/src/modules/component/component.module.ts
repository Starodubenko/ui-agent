import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VersionModule } from '@version/version.module';
import { CreateComponentHandler } from './commands/create-component.handler';
import { ComponentResolver } from './component.resolver';
import { ComponentService } from './component.service';
import { FindComponentByIdHandler } from './queries/find-by-id.handler';
import { ListComponentsByUserHandler } from './queries/list-by-user.handler';

const CommandHandlers = [CreateComponentHandler];
const QueryHandlers = [FindComponentByIdHandler, ListComponentsByUserHandler];

@Module({
  imports: [CqrsModule, VersionModule],
  providers: [
    ComponentService,
    ComponentResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [ComponentService],
})
export class ComponentModule {}
