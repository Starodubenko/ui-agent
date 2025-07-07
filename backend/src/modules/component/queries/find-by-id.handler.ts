import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindComponentByIdQuery } from './find-by-id.query';
import { PrismaService } from '@prisma/prisma.service';
import { ComponentOutput } from '../models/component.output';
import { mapComponentToOutput } from '../mappers/component-output.mapper';

@QueryHandler(FindComponentByIdQuery)
export class FindComponentByIdHandler implements IQueryHandler<FindComponentByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindComponentByIdQuery): Promise<ComponentOutput | null> {
    const component = await this.prisma.component.findUnique({ where: { id: query.id } });
    return component ? mapComponentToOutput(component) : null;
  }
}
