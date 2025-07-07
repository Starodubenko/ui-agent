import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListPromptByUserQuery } from './list-by-user.query';
import { PrismaService } from '@prisma/prisma.service';
import { PromptOutput } from '../models/prompt.output';
import { mapPromptToOutput } from '../mappers/prompt-output.mapper';

@QueryHandler(ListPromptByUserQuery)
export class ListPromptByUserHandler
  implements IQueryHandler<ListPromptByUserQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ListPromptByUserQuery): Promise<PromptOutput[]> {
    const pr = await this.prisma.promptRequest.findMany({
      where: { userId: query.userId },
      orderBy: { createdAt: 'desc' },
    });
    return pr.map(mapPromptToOutput);
  }
}
