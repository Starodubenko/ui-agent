import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFigmaCommand } from './create-figma.command';
import { PrismaService } from '@prisma/prisma.service';
import { FigmaOutput } from '../models/figma.output';
import { mapFigmaToOutput } from '../mappers/figma-output.mapper';

@CommandHandler(CreateFigmaCommand)
export class CreateFigmaHandler implements ICommandHandler<CreateFigmaCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateFigmaCommand): Promise<FigmaOutput> {
    const { userId, componentId, fileId, nodeId, meta } = command;
    const figma = await this.prisma.figmaFile.create({
      data: { userId, componentId, fileId, nodeId, meta },
    });
    return mapFigmaToOutput(figma);
  }
}
