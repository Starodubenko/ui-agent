import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTestInput } from './dto/create-test.input';
import { UpdateTestInput } from './dto/update-test.input';
import { CreateTestCommand } from './commands/create-test.command';
import { UpdateTestCommand } from './commands/update-test.command';
import { DeleteTestCommand } from './commands/delete-test.command';
import { FindTestByIdQuery } from './queries/find-by-id.query';
import { ListTestsByVersionQuery } from './queries/list-by-version.query';
import { TestOutput } from './models/test.output';

@Injectable()
export class TestService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(input: CreateTestInput): Promise<TestOutput> {
    return this.commandBus.execute(
      new CreateTestCommand(
        input.componentVersionId,
        input.name,
        input.code,
        input.meta,
      ),
    );
  }

  update(input: UpdateTestInput): Promise<TestOutput> {
    return this.commandBus.execute(
      new UpdateTestCommand(input.id, input.name, input.code, input.meta),
    );
  }

  delete(id: string): Promise<{ id: string }> {
    return this.commandBus.execute(new DeleteTestCommand(id));
  }

  findById(id: string): Promise<TestOutput | null> {
    return this.queryBus.execute(new FindTestByIdQuery(id));
  }

  listByVersion(componentVersionId: string): Promise<TestOutput[]> {
    return this.queryBus.execute(
      new ListTestsByVersionQuery(componentVersionId),
    );
  }
}
