import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TestModule } from '@test/test.module';
import { CreateVersionHandler } from './commands/create-version.handler';
import { FindVersionByIdHandler } from './queries/find-by-id.handler';
import { ListVersionsByComponentHandler } from './queries/list-by-component.handler';
import { VersionResolver } from './version.resolver';
import { VersionService } from './version.service';

const CommandHandlers = [CreateVersionHandler];
const QueryHandlers = [FindVersionByIdHandler, ListVersionsByComponentHandler];

@Module({
  imports: [CqrsModule, TestModule],
  providers: [
    VersionService,
    VersionResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [VersionService],
})
export class VersionModule {}
