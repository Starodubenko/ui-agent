import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListComponentsByUserQuery } from './list-by-user.query';
import { PrismaService } from '@prisma/prisma.service';
import { ComponentOutput } from '../models/component.output';
import { mapComponentToOutput } from '../mappers/component-output.mapper';

@QueryHandler(ListComponentsByUserQuery)
export class ListComponentsByUserHandler implements IQueryHandler<ListComponentsByUserQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ListComponentsByUserQuery): Promise<ComponentOutput[]> {
    const components = await this.prisma.component.findMany({
      where: { userId: query.userId },
      orderBy: { createdAt: 'desc' }
    });
    return components.map(mapComponentToOutput);
  }
}
