import { User as PrismaUser } from '@prisma/client';

export interface RequestWithUser extends Request {
  user?: PrismaUser;
}
