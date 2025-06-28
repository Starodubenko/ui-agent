import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FigmaModule } from '../figma/figma.module';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  imports: [FigmaModule, OpenaiModule],
  providers: [AiService, PrismaService],
  controllers: [AiController],
})
export class AiModule {}
