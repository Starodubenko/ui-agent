import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFigmaHandler } from './commands/create-figma.handler';
import { DeleteFigmaHandler } from './commands/delete-figma.handler';
import { UpdateFigmaHandler } from './commands/update-figma.handler';
import { FigmaResolver } from './figma.resolver';
import { FigmaService } from './figma.service';
import { FindFigmaByIdHandler } from './queries/find-by-id.handler';
import { ListFigmaByUserHandler } from './queries/list-by-user.handler';

const CommandHandlers = [
  CreateFigmaHandler,
  UpdateFigmaHandler,
  DeleteFigmaHandler,
];
const QueryHandlers = [FindFigmaByIdHandler, ListFigmaByUserHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    FigmaService,
    FigmaResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [FigmaService],
})
export class FigmaModule {}
