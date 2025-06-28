import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import {
  FigmaFileNodesResponse,
  FigmaNode,
} from './types/figma-node.interface';

@Injectable()
export class FigmaService {
  private readonly baseUrl = 'https://api.figma.com/v1';

  private getToken(): string {
    if (!process.env.FIGMA_TOKEN) {
      throw new UnauthorizedException('Figma API token not configured');
    }
    return process.env.FIGMA_TOKEN;
  }

  async getComponentCode(fileId: string, nodeId: string): Promise<FigmaNode> {
    try {
      const url = `${this.baseUrl}/files/${fileId}/nodes?ids=${nodeId}`;
      const response = await axios.get<FigmaFileNodesResponse>(url, {
        headers: {
          'X-Figma-Token': this.getToken(),
        },
      });

      const nodes = response.data.nodes;
      const nodeWrapper = nodes?.[nodeId];
      if (!nodeWrapper || !nodeWrapper.document) {
        throw new InternalServerErrorException('Figma node not found');
      }

      return nodeWrapper.document;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        throw new InternalServerErrorException(
          `Figma API error: ${err.response.status} - ${err.response.statusText}`,
        );
      }
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(
        'Unknown error while fetching Figma code',
      );
    }
  }
}
