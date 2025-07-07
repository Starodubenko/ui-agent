import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@prisma/prisma.service';
import { mapUserToOutput } from '../mappers/user-output.mapper';
import { UserOutput } from '../models/user.output';
import { FindUserByIdQuery } from './find-by-id.query';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindUserByIdQuery): Promise<UserOutput | null> {
    const user = await this.prisma.user.findUnique({ where: { id: query.id } });
    return user ? mapUserToOutput(user) : null;
  }
}
