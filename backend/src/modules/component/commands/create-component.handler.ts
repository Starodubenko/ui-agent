import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateComponentCommand } from './create-component.command';
import { PrismaService } from '@prisma/prisma.service';
import { ComponentOutput } from '../models/component.output';
import { mapComponentToOutput } from '../mappers/component-output.mapper';

@CommandHandler(CreateComponentCommand)
export class CreateComponentHandler
  implements ICommandHandler<CreateComponentCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateComponentCommand): Promise<ComponentOutput> {
    const { userId, name } = command;
    const component = await this.prisma.component.create({
      data: { userId, name },
    });
    return mapComponentToOutput(component);
  }
}
