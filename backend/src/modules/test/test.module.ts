import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TestService } from './test.service';
import { TestResolver } from './test.resolver';
import { CreateTestHandler } from './commands/create-test.handler';
import { UpdateTestHandler } from './commands/update-test.handler';
import { DeleteTestHandler } from './commands/delete-test.handler';
import { FindTestByIdHandler } from './queries/find-by-id.handler';
import { ListTestsByVersionHandler } from './queries/list-by-version.handler';

const CommandHandlers = [
  CreateTestHandler,
  UpdateTestHandler,
  DeleteTestHandler,
];
const QueryHandlers = [FindTestByIdHandler, ListTestsByVersionHandler];

@Module({
  imports: [CqrsModule],
  providers: [TestService, TestResolver, ...CommandHandlers, ...QueryHandlers],
  exports: [TestService],
})
export class TestModule {}
