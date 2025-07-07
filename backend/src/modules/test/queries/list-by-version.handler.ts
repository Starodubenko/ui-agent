import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListTestsByVersionQuery } from './list-by-version.query';
import { PrismaService } from '@prisma/prisma.service';
import { TestOutput } from '../models/test.output';
import { mapTestToOutput } from '../mappers/test-output.mapper';

@QueryHandler(ListTestsByVersionQuery)
export class ListTestsByVersionHandler
  implements IQueryHandler<ListTestsByVersionQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ListTestsByVersionQuery): Promise<TestOutput[]> {
    const tests = await this.prisma.test.findMany({
      where: { componentVersionId: query.componentVersionId },
      orderBy: { createdAt: 'desc' },
    });
    return tests.map(mapTestToOutput);
  }
}
