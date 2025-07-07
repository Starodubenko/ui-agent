import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTestCommand } from './delete-test.command';
import { PrismaService } from '@prisma/prisma.service';

@CommandHandler(DeleteTestCommand)
export class DeleteTestHandler implements ICommandHandler<DeleteTestCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteTestCommand): Promise<{ id: string }> {
    const { id } = command;
    await this.prisma.test.delete({ where: { id } });
    return { id };
  }
}
