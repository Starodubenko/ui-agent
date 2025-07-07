import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateComponentCommand } from './commands/create-component.command';
import { CreateComponentInput } from './dto/create-component.input';
import { ComponentOutput } from './models/component.output';
import { FindComponentByIdQuery } from './queries/find-by-id.query';
import { ListComponentsByUserQuery } from './queries/list-by-user.query';

@Injectable()
export class ComponentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(
    userId: string,
    input: CreateComponentInput,
  ): Promise<ComponentOutput> {
    return this.commandBus.execute(
      new CreateComponentCommand(userId, input.name),
    );
  }

  findById(id: string): Promise<ComponentOutput | null> {
    return this.queryBus.execute(new FindComponentByIdQuery(id));
  }

  listByUser(userId: string): Promise<ComponentOutput[]> {
    return this.queryBus.execute(new ListComponentsByUserQuery(userId));
  }
}
