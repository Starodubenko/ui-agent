import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFigmaCommand } from './delete-figma.command';
import { PrismaService } from '@prisma/prisma.service';

@CommandHandler(DeleteFigmaCommand)
export class DeleteFigmaHandler implements ICommandHandler<DeleteFigmaCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteFigmaCommand): Promise<{ id: string }> {
    const { id } = command;
    await this.prisma.figmaFile.delete({ where: { id } });
    return { id };
  }
}
