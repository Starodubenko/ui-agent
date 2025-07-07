import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTestCommand } from './create-test.command';
import { PrismaService } from '@prisma/prisma.service';
import { TestOutput } from '../models/test.output';
import { mapTestToOutput } from '../mappers/test-output.mapper';

@CommandHandler(CreateTestCommand)
export class CreateTestHandler implements ICommandHandler<CreateTestCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateTestCommand): Promise<TestOutput> {
    const { componentVersionId, name, code, meta } = command;
    const test = await this.prisma.test.create({
      data: { componentVersionId, name, code, meta },
    });
    return mapTestToOutput(test);
  }
}
