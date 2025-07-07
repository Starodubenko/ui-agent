import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToOutput } from '../mappers/user-output.mapper';
import { UserOutput } from '../models/user.output';
import { FindUserByEmailQuery } from './find-by-email.query';

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler
  implements IQueryHandler<FindUserByEmailQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindUserByEmailQuery): Promise<UserOutput | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: query.email },
    });
    return user ? mapUserToOutput(user) : null;
  }
}
