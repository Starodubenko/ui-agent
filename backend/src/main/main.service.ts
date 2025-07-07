import { Injectable } from '@nestjs/common';
import { PromptService } from '@prompt/prompt.service';
import { FigmaApiService } from '@shared/figma/figma-api.service';
import { VersionService } from '@version/version.service';
import { GenerateComponentInput } from './dto/generate-component.input';
import { GenerateFigmaInput } from './dto/generate-figma.input';
import { GenerateTestsInput } from './dto/generate-tests.input';
import { GenerateResultOutput } from './models/generate-result.output';

function extractTsCodeBlock(input: string): string {
  const match = input.match(/```(?:ts|tsx)\n([\s\S]*?)```/);
  return match ? match[1].trim() : '';
}

@Injectable()
export class MainService {
  constructor(
    private readonly promptService: PromptService,
    private readonly figmaApi: FigmaApiService,
    private readonly componentVersionService: VersionService,
  ) {}

  async generateComponentByPrompt(
    userId: string,
    input: GenerateComponentInput,
  ): Promise<GenerateResultOutput> {
    const result = await this.promptService.create(userId, input);
    return {
      prompt: result.prompt,
      response: {
        original: result.response,
        code: extractTsCodeBlock(result.response),
      },
      meta: result.meta,
    };
  }

  async generateComponentByFigma(
    userId: string,
    input: GenerateFigmaInput,
  ): Promise<GenerateResultOutput> {
    const { fileId, nodeId, technologies, styles, extra } = input;
    const nodeData = await this.figmaApi.getNode(fileId, nodeId);

    const nodeSummary = nodeData
      ? JSON.stringify(nodeData, null, 2)
      : 'Весь файл Figma.';

    const promptInput = {
      title: nodeData?.name || 'Компонент из Figma',
      technologies: technologies || ['React', 'Typescript'],
      styles: styles || ['Material UI v7'],
      extra: `Сгенерируй компонент по структуре Figma (fileId: ${fileId}, nodeId: ${nodeId || '-'}).\n${nodeSummary}\n${extra || ''}`,
      meta: { fileId, nodeId, nodeData },
    };

    const result = await this.promptService.create(userId, promptInput);
    return {
      prompt: result.prompt,
      response: {
        original: result.response,
        code: extractTsCodeBlock(result.response),
      },
      meta: result.meta,
    };
  }

  async generateTestsForComponent(
    userId: string,
    input: GenerateTestsInput,
  ): Promise<GenerateResultOutput> {
    const { componentVersionId, technologies, styles, extra } = input;
    const version =
      await this.componentVersionService.findById(componentVersionId);
    if (!version) throw new Error('ComponentVersion not found');

    const promptInput = {
      title: 'Unit-тесты для компонента',
      technologies: technologies || ['React', 'Typescript'],
      styles: styles || [],
      extra: `Сгенерируй unit-тесты для следующего кода:\n${version.code}\n${extra || ''}`,
      componentId: version.componentId,
      meta: { componentVersionId },
    };

    const result = await this.promptService.create(userId, promptInput);
    return {
      prompt: result.prompt,
      response: {
        original: result.response,
        code: extractTsCodeBlock(result.response),
      },
      meta: result.meta,
    };
  }
}
