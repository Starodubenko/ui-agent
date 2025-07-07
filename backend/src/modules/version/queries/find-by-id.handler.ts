import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindVersionByIdQuery } from './find-by-id.query';
import { PrismaService } from '@prisma/prisma.service';
import { VersionOutput } from '../models/version.output';
import { mapVersionToOutput } from '../mappers/version-output.mapper';

@QueryHandler(FindVersionByIdQuery)
export class FindVersionByIdHandler implements IQueryHandler<FindVersionByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindVersionByIdQuery): Promise<VersionOutput | null> {
    const version = await this.prisma.version.findUnique({ where: { id: query.id } });
    return version ? mapVersionToOutput(version) : null;
  }
}
