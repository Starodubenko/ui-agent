import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { OpenaiService } from 'src/openai/openai.service';
import { FigmaService } from '../figma/figma.service';
import { FigmaNode } from '../figma/types/figma-node.interface';
import { PrismaService } from '../prisma/prisma.service';
import { figmaNodeToDescription } from './utils/figmaNodeToDescription';

@Injectable()
export class AiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly figmaService: FigmaService,
    private readonly openai: OpenaiService,
  ) {}

  async generate(prompt: string, user?: User): Promise<string> {
    try {
      const code = await this.openai.generateCode(prompt);

      if (user) {
        await this.prisma.aiHistory.create({
          data: {
            prompt,
            code,
            type: 'generate',
            userId: user.id,
          },
        });
      }

      return code;
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(
        'Unknown error during code generation',
      );
    }
  }

  async refactor(code: string, user?: User): Promise<string> {
    const result = code;
    if (user) {
      await this.prisma.aiHistory.create({
        data: {
          prompt: 'refactor',
          code: result,
          type: 'refactor',
          userId: user.id,
        },
      });
    }
    return result;
  }

  async importFigma(
    fileId: string,
    nodeId: string,
    user?: User,
  ): Promise<{ code: string; node: FigmaNode }> {
    if (!user)
      throw new UnauthorizedException(
        'User must be authenticated for figma import',
      );
    try {
      const node: FigmaNode = await this.figmaService.getComponentCode(
        fileId,
        nodeId,
      );
      const code = await this.openai.generateReactComponentFromFigma(node);

      await this.prisma.aiHistory.create({
        data: {
          prompt: `figma:${fileId}:${nodeId}`,
          code,
          type: 'figma',
          userId: user.id,
        },
      });

      return { code, node }; // сразу два результата
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(
        'Unknown error during Figma import',
      );
    }
  }

  async generateReactComponentFromFigma(node: FigmaNode): Promise<string> {
    // Текстовое описание
    const humanDesc = figmaNodeToDescription(node);

    const prompt = [
      `Дан UI-компонент из Figma. Сгенерируй современный, production-ready React-компонент на TypeScript и Material-UI 7.`,
      'Вот краткое описание:',
      humanDesc,
      '',
      'JSON-структура:',
      '```json',
      JSON.stringify(node, null, 2),
      '```',
      '',
      'Сгенерируй только исходный код компонента без комментариев и пояснений.',
    ].join('\n');

    return this.generate(prompt);
  }

  async generateTest(
    prompt: string,
    code: string,
    user?: User,
  ): Promise<string> {
    try {
      // Промпт для AI: комбинируем дефолт и код
      const fullPrompt = `${prompt}\n\n${code}`;

      const testCode = await this.openai.generateCode(fullPrompt);

      if (user) {
        await this.prisma.aiHistory.create({
          data: {
            prompt,
            code: testCode,
            type: 'test',
            userId: user.id,
          },
        });
      }

      return testCode;
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(
        'Unknown error during test generation',
      );
    }
  }

  async getHistory(user: User) {
    return this.prisma.aiHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getComponentVersions(name: string, user: User) {
    return this.prisma.component.findMany({
      where: { ownerId: user.id, name },
      orderBy: { version: 'desc' },
    });
  }

  async getMyLatestComponents(user: User) {
    return this.prisma.component.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: [{ name: 'asc' }, { version: 'desc' }],
      distinct: ['name'],
    });
  }

  async saveComponent(name: string, code: string, user: User) {
    try {
      const last = await this.prisma.component.findFirst({
        where: { ownerId: user.id, name },
        orderBy: { version: 'desc' },
      });
      const newVersion = last ? last.version + 1 : 1;

      return await this.prisma.component.create({
        data: {
          name,
          code,
          version: newVersion,
          ownerId: user.id,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(
        'Unknown error while saving component',
      );
    }
  }

  async deleteComponent(name: string, version: number, user: User) {
    try {
      const result = await this.prisma.component.deleteMany({
        where: {
          ownerId: user.id,
          name,
          version,
        },
      });
      return { deleted: result.count };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(
        'Unknown error while deleting component',
      );
    }
  }
}
