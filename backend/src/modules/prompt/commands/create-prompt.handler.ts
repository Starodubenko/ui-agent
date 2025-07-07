import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@prisma/prisma.service';
import { OpenAiApiService } from '@shared/openai';
import { getBasePrompt } from '../../../prompt-templates/basePrompt';
import { mapPromptToOutput } from '../mappers/prompt-output.mapper';
import { PromptOutput } from '../models/prompt.output';
import { CreatePromptCommand } from './create-prompt.command';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { loadSystemRoleDescription } from '@shared/utils';
import { resolve } from 'path';

@CommandHandler(CreatePromptCommand)
export class CreatePromptHandler
  implements ICommandHandler<CreatePromptCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly openAiApi: OpenAiApiService,
  ) {}

  async execute(command: CreatePromptCommand): Promise<PromptOutput> {
    const { userId, title, technologies, styles, extra, componentId, meta } =
      command;

    const systemRoleDescription = (
      await loadSystemRoleDescription(resolve(__dirname, './roles'))
    ).replace('[front-end libs]', technologies.join(', '));
    const prompt = getBasePrompt({ title, technologies, styles, extra: meta });

    console.log(systemRoleDescription);
    console.log(prompt);

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemRoleDescription },
      { role: 'user', content: prompt },
    ];

    const response = await this.openAiApi.chat({ messages });

    const pr = await this.prisma.promptRequest.create({
      data: { userId, componentId, prompt, response: response.content, meta },
    });

    return mapPromptToOutput(pr);
  }
}
