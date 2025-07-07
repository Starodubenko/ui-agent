import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppConfigService } from '@config/config.service';
import {
  FigmaFileResponse,
  FigmaNodesResponse,
  FigmaNode,
} from './figma-types';

@Injectable()
export class FigmaApiService {
  constructor(private readonly configService: AppConfigService) {}

  /**
   * Получить метаинформацию о Figma файле и его структуру (document tree).
   */
  async getFile(fileId: string): Promise<FigmaFileResponse> {
    const url = `https://api.figma.com/v1/files/${fileId}`;
    const token = this.configService.figmaApiKey;
    const res = await axios.get<FigmaFileResponse>(url, {
      headers: { 'X-Figma-Token': token },
    });
    return res.data;
  }

  /**
   * Получить информацию о конкретном Node внутри Figma файла.
   */
  async getNode(fileId: string, nodeId?: string): Promise<FigmaNode | null> {
    if (!nodeId) return null;

    const url = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`;
    const token = this.configService.figmaApiKey;
    const res = await axios.get<FigmaNodesResponse>(url, {
      headers: { 'X-Figma-Token': token },
    });
    const doc = res.data.nodes?.[nodeId]?.document;
    return doc || null;
  }
}
