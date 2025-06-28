import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { User } from '../common/decorators/user.decorator';
import { AiService } from './ai.service';

interface GenerateDto {
  prompt: string;
}
interface RefactorDto {
  code: string;
}
interface FigmaDto {
  fileId: string;
  nodeId: string;
}
interface TestGenDto {
  prompt: string;
  code: string;
}
interface SaveComponentDto {
  name: string;
  code: string;
}

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  async generate(@Body() body: GenerateDto, @User() user?: UserModel) {
    return { code: await this.aiService.generate(body.prompt, user) };
  }

  @Post('refactor')
  async refactor(@Body() body: RefactorDto, @User() user?: UserModel) {
    return { code: await this.aiService.refactor(body.code, user) };
  }

  @Post('figma')
  async figma(@Body() body: FigmaDto, @User() user?: UserModel) {
    return {
      code: await this.aiService.importFigma(body.fileId, body.nodeId, user),
    };
  }

  @Post('testgen')
  async testgen(@Body() dto: TestGenDto, @User() user?: UserModel) {
    // Если промпт не задан, ставим дефолт
    const prompt =
      dto.prompt ||
      'Сгенерируй unit-тест (Jest + @testing-library/react) для следующего React-компонента:';
    return {
      code: await this.aiService.generateTest(prompt, dto.code, user),
    };
  }

  @Get('history')
  async history(@User() user: UserModel) {
    return this.aiService.getHistory(user);
  }

  @Get('components')
  async getLatestComponents(@User() user: UserModel) {
    return this.aiService.getMyLatestComponents(user);
  }

  @Post('component')
  async saveComponent(@Body() dto: SaveComponentDto, @User() user: UserModel) {
    return this.aiService.saveComponent(dto.name, dto.code, user);
  }

  // Новый endpoint для удаления определённой версии
  @Delete('component/:name/:version')
  async deleteComponent(
    @Param('name') name: string,
    @Param('version') version: string,
    @User() user: UserModel,
  ) {
    return this.aiService.deleteComponent(name, Number(version), user);
  }
}
