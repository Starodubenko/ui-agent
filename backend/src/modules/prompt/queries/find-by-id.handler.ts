import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPromptByIdQuery } from './find-by-id.query';
import { PrismaService } from '@prisma/prisma.service';
import { PromptOutput } from '../models/prompt.output';
import { mapPromptToOutput } from '../mappers/prompt-output.mapper';

@QueryHandler(FindPromptByIdQuery)
export class FindPromptByIdHandler
  implements IQueryHandler<FindPromptByIdQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindPromptByIdQuery): Promise<PromptOutput | null> {
    const pr = await this.prisma.promptRequest.findUnique({
      where: { id: query.id },
    });
    return pr ? mapPromptToOutput(pr) : null;
  }
}
