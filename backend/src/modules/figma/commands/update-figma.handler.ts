import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFigmaCommand } from './update-figma.command';
import { PrismaService } from '@prisma/prisma.service';
import { FigmaOutput } from '../models/figma.output';
import { mapFigmaToOutput } from '../mappers/figma-output.mapper';

@CommandHandler(UpdateFigmaCommand)
export class UpdateFigmaHandler implements ICommandHandler<UpdateFigmaCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateFigmaCommand): Promise<FigmaOutput> {
    const { id, fileId, nodeId, meta } = command;
    const figma = await this.prisma.figmaFile.update({
      where: { id },
      data: {
        ...(fileId !== undefined && { fileId }),
        ...(nodeId !== undefined && { nodeId }),
        ...(meta !== undefined && { meta }),
      },
    });
    return mapFigmaToOutput(figma);
  }
}
