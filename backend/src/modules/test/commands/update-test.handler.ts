import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTestCommand } from './update-test.command';
import { PrismaService } from '@prisma/prisma.service';
import { TestOutput } from '../models/test.output';
import { mapTestToOutput } from '../mappers/test-output.mapper';

@CommandHandler(UpdateTestCommand)
export class UpdateTestHandler implements ICommandHandler<UpdateTestCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateTestCommand): Promise<TestOutput> {
    const { id, name, code, meta } = command;
    const test = await this.prisma.test.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(code !== undefined && { code }),
        ...(meta !== undefined && { meta }),
      },
    });
    return mapTestToOutput(test);
  }
}
