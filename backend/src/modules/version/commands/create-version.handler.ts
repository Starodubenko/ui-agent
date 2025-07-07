import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@prisma/prisma.service';
import { mapVersionToOutput } from '../mappers/version-output.mapper';
import { VersionOutput } from '../models/version.output';
import { CreateVersionCommand } from './create-version.command';

@CommandHandler(CreateVersionCommand)
export class CreateVersionHandler
  implements ICommandHandler<CreateVersionCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateVersionCommand): Promise<VersionOutput> {
    const { componentId, name, code, meta } = command;
    const version = await this.prisma.version.create({
      data: { componentId, name, code, meta },
    });
    return mapVersionToOutput(version);
  }
}
