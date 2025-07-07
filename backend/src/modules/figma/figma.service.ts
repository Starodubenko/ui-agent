import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFigmaCommand } from './commands/create-figma.command';
import { DeleteFigmaCommand } from './commands/delete-figma.command';
import { UpdateFigmaCommand } from './commands/update-figma.command';
import { CreateFigmaInput } from './dto/create-figma.input';
import { UpdateFigmaInput } from './dto/update-figma.input';
import { FigmaOutput } from './models/figma.output';
import { FindFigmaByIdQuery } from './queries/find-by-id.query';
import { ListFigmaByUserQuery } from './queries/list-by-user.query';

@Injectable()
export class FigmaService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(input: CreateFigmaInput): Promise<FigmaOutput> {
    return this.commandBus.execute(
      new CreateFigmaCommand(
        input.userId,
        input.componentId,
        input.fileId,
        input.nodeId,
        input.meta,
      ),
    );
  }

  update(input: UpdateFigmaInput): Promise<FigmaOutput> {
    return this.commandBus.execute(
      new UpdateFigmaCommand(input.id, input.fileId, input.nodeId, input.meta),
    );
  }

  delete(id: string): Promise<{ id: string }> {
    return this.commandBus.execute(new DeleteFigmaCommand(id));
  }

  findById(id: string): Promise<FigmaOutput | null> {
    return this.queryBus.execute(new FindFigmaByIdQuery(id));
  }

  listByUser(userId: string): Promise<FigmaOutput[]> {
    return this.queryBus.execute(new ListFigmaByUserQuery(userId));
  }
}
