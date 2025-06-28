#!/bin/bash

set -e

mkdir -p src/ai

# ai.controller.ts
cat > src/ai/ai.controller.ts << 'EOF'
import { Controller, Post, Body, Req } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generate(@Body('prompt') prompt: string, @Req() req: any) {
    return { code: await this.aiService.generate(prompt, req.user) };
  }

  @Post('refactor')
  async refactor(@Body('code') code: string, @Req() req: any) {
    return { code: await this.aiService.refactor(code, req.user) };
  }

  @Post('figma')
  async figma(@Body() body: any, @Req() req: any) {
    return { code: await this.aiService.importFigma(body.fileId, body.nodeId, req.user) };
  }

  @Post('testgen')
  async testgen(@Body() body: any, @Req() req: any) {
    return { code: await this.aiService.generateTest(body.prompt, body.code, req.user) };
  }
}
EOF

# ai.service.ts
cat > src/ai/ai.service.ts << 'EOF'
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generate(prompt: string, user?: any): Promise<string> {
    return \`// generated code for: \${prompt}\`;
  }
  async refactor(code: string, user?: any): Promise<string> {
    return code;
  }
  async importFigma(fileId: string, nodeId: string, user?: any): Promise<string> {
    return "// code from figma";
  }
  async generateTest(prompt: string, code: string, user?: any): Promise<string> {
    return "// generated test";
  }
}
EOF

# ai.module.ts
cat > src/ai/ai.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
EOF

# app.module.ts
cat > src/app.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AiModule],
})
export class AppModule {}
EOF

# main.ts
cat > src/main.ts << 'EOF'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
EOF

echo "✅ Базовые файлы NestJS AI backend созданы и готовы к запуску!"
