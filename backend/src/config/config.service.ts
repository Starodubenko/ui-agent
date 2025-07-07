import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: NestConfigService) {}

  get openAiApiKey(): string {
    return this.config.get<string>('OPENAI_API_KEY', '');
  }

  get dbUrl(): string {
    return this.config.get<string>('DATABASE_URL', '');
  }

  get jwtKey(): string {
    return this.config.get<string>('JWT_SECRET', 'default-secret');
  }

  get figmaApiKey(): string {
    return this.config.get<string>('FIGMA_API_KEY', '');
  }
}
