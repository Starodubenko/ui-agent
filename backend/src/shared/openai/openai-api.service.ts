import { AppConfigService } from '@config/config.service';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  OpenAiBusinessChatResponse,
  OpenAiChatRequest,
} from './openai-api.types';

@Injectable()
export class OpenAiApiService {
  constructor(private readonly configService: AppConfigService) {}

  async chat(request: OpenAiChatRequest): Promise<OpenAiBusinessChatResponse> {
    const openai = new OpenAI({ apiKey: this.configService.openAiApiKey });

    const response = await openai.chat.completions.create({
      model: request.model || 'gpt-4o',
      messages: request.messages,
      temperature: request.temperature ?? 0.3,
      max_tokens: request.max_tokens ?? 2048,
      top_p: request.top_p,
      frequency_penalty: request.frequency_penalty,
      presence_penalty: request.presence_penalty,
      stop: request.stop,
      user: request.user,
    });

    const content = response.choices?.[0]?.message?.content?.trim() ?? '';
    const usage = response.usage;

    return {
      content,
      full: response,
      usage,
      messages: request.messages,
    };
  }
}
