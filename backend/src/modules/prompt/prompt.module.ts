import { AppConfigModule } from '@config/config.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OpenAiApiService } from '@shared/openai';
import { CreatePromptHandler } from './commands/create-prompt.handler';
import { PromptResolver } from './prompt.resolver';
import { PromptService } from './prompt.service';
import { FindPromptByIdHandler } from './queries/find-by-id.handler';
import { ListPromptByUserHandler } from './queries/list-by-user.handler';

const CommandHandlers = [CreatePromptHandler];
const QueryHandlers = [FindPromptByIdHandler, ListPromptByUserHandler];

@Module({
  imports: [CqrsModule, AppConfigModule],
  providers: [
    PromptService,
    PromptResolver,
    OpenAiApiService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [PromptService, OpenAiApiService],
})
export class PromptModule {}
