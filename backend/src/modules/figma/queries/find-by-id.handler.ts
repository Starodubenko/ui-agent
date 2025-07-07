import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFigmaByIdQuery } from './find-by-id.query';
import { PrismaService } from '@prisma/prisma.service';
import { FigmaOutput } from '../models/figma.output';
import { mapFigmaToOutput } from '../mappers/figma-output.mapper';

@QueryHandler(FindFigmaByIdQuery)
export class FindFigmaByIdHandler implements IQueryHandler<FindFigmaByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindFigmaByIdQuery): Promise<FigmaOutput | null> {
    const figma = await this.prisma.figmaFile.findUnique({
      where: { id: query.id },
    });
    return figma ? mapFigmaToOutput(figma) : null;
  }
}
