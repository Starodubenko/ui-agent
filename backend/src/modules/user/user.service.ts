import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserCommand } from './commands/create-user.command';
import { mapUserToOutput } from './mappers/user-output.mapper';
import { UserOutput } from './models/user.output';
import { FindUserByEmailQuery } from './queries/find-by-email.query';
import { FindUserByIdQuery } from './queries/find-by-id.query';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  async findById(id: string): Promise<UserOutput | null> {
    return this.queryBus.execute(new FindUserByIdQuery(id));
  }

  async findByEmail(email: string): Promise<UserOutput | null> {
    return this.queryBus.execute(new FindUserByEmailQuery(email));
  }

  async createUser(email: string, password: string): Promise<UserOutput> {
    return this.commandBus.execute(new CreateUserCommand(email, password));
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserOutput | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? mapUserToOutput(user) : null;
  }
}
