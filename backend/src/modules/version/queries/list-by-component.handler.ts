import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@prisma/prisma.service';
import { mapVersionToOutput } from '../mappers/version-output.mapper';
import { VersionOutput } from '../models/version.output';
import { ListVersionsByComponentQuery } from './list-by-component.query';

@QueryHandler(ListVersionsByComponentQuery)
export class ListVersionsByComponentHandler
  implements IQueryHandler<ListVersionsByComponentQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ListVersionsByComponentQuery): Promise<VersionOutput[]> {
    const versions = await this.prisma.version.findMany({
      where: { componentId: query.componentId },
      orderBy: { createdAt: 'desc' },
    });
    return versions.map(mapVersionToOutput);
  }
}
