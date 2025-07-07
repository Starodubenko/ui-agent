import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTestByIdQuery } from './find-by-id.query';
import { PrismaService } from '@prisma/prisma.service';
import { TestOutput } from '../models/test.output';
import { mapTestToOutput } from '../mappers/test-output.mapper';

@QueryHandler(FindTestByIdQuery)
export class FindTestByIdHandler implements IQueryHandler<FindTestByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindTestByIdQuery): Promise<TestOutput | null> {
    const test = await this.prisma.test.findUnique({ where: { id: query.id } });
    return test ? mapTestToOutput(test) : null;
  }
}
