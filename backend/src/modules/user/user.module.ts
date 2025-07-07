import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

import { ComponentModule } from '@component/component.module';
import { PrismaModule } from '@prisma/prisma.module';
import { CreateUserHandler } from './commands/create-user.handler';
import { FindUserByEmailHandler } from './queries/find-by-email.handler';
import { FindUserByIdHandler } from './queries/find-by-id.handler';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers = [FindUserByEmailHandler, FindUserByIdHandler];

@Module({
  imports: [CqrsModule, PrismaModule, ComponentModule],
  providers: [
    UserResolver,
    UserService,
    UserResolver,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [UserService],
})
export class UserModule {}
