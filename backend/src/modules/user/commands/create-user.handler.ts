import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { PrismaService } from '../../prisma/prisma.service';
import { mapUserToOutput } from '../mappers/user-output.mapper';
import * as bcrypt from 'bcryptjs';
import { UserOutput } from '../models/user.output';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateUserCommand): Promise<UserOutput> {
    const { email, password } = command;
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed },
    });
    return mapUserToOutput(user);
  }
}
