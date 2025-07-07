import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateVersionInput } from './dto/create-version.input';
import { CreateVersionCommand } from './commands/create-version.command';
import { FindVersionByIdQuery } from './queries/find-by-id.query';
import { ListVersionsByComponentQuery } from './queries/list-by-component.query';
import { VersionOutput } from './models/version.output';

@Injectable()
export class VersionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(input: CreateVersionInput): Promise<VersionOutput> {
    return this.commandBus.execute(
      new CreateVersionCommand(
        input.componentId,
        input.name,
        input.code,
        input.meta,
      ),
    );
  }

  findById(id: string): Promise<VersionOutput | null> {
    return this.queryBus.execute(new FindVersionByIdQuery(id));
  }

  listByComponent(componentId: string): Promise<VersionOutput[]> {
    return this.queryBus.execute(new ListVersionsByComponentQuery(componentId));
  }
}
