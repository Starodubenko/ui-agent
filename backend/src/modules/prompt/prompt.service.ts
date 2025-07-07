import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePromptInput } from './dto/create-prompt.input';
import { CreatePromptCommand } from './commands/create-prompt.command';
import { FindPromptByIdQuery } from './queries/find-by-id.query';
import { ListPromptByUserQuery } from './queries/list-by-user.query';
import { PromptOutput } from './models/prompt.output';

@Injectable()
export class PromptService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(userId: string, input: CreatePromptInput): Promise<PromptOutput> {
    return this.commandBus.execute(
      new CreatePromptCommand(
        userId,
        input.title,
        input.technologies,
        input.styles,
        input.extra,
        input.componentId,
        input.meta,
      ),
    );
  }

  findById(id: string): Promise<PromptOutput | null> {
    return this.queryBus.execute(new FindPromptByIdQuery(id));
  }

  listByUser(userId: string): Promise<PromptOutput[]> {
    return this.queryBus.execute(new ListPromptByUserQuery(userId));
  }
}
