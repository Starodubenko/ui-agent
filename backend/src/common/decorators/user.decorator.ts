import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { RequestWithUser } from '../types/request';

function isPrismaUser(user: unknown): user is PrismaUser {
  return (
    typeof user === 'object' && user !== null && 'id' in user && 'email' in user
  );
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PrismaUser | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = request;

    // ПРОВЕРКА через type guard:
    if (isPrismaUser(user)) {
      return user;
    }
    return undefined;
  },
);
