import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListFigmaByUserQuery } from './list-by-user.query';
import { PrismaService } from '@prisma/prisma.service';
import { FigmaOutput } from '../models/figma.output';
import { mapFigmaToOutput } from '../mappers/figma-output.mapper';

@QueryHandler(ListFigmaByUserQuery)
export class ListFigmaByUserHandler
  implements IQueryHandler<ListFigmaByUserQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ListFigmaByUserQuery): Promise<FigmaOutput[]> {
    const figmas = await this.prisma.figmaFile.findMany({
      where: { userId: query.userId },
      orderBy: { createdAt: 'desc' },
    });
    return figmas.map(mapFigmaToOutput);
  }
}
