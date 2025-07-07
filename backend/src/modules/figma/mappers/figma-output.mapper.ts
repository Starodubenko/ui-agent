import { FigmaOutput } from '../models/figma.output';

export function mapFigmaToOutput(entity: any): FigmaOutput {
  if (!entity) throw new Error('FigmaFile not found');
  const {
    id,
    userId,
    componentId,
    fileId,
    nodeId,
    meta,
    createdAt,
    updatedAt,
  } = entity;
  return {
    id,
    userId,
    componentId,
    fileId,
    nodeId,
    meta,
    createdAt,
    updatedAt,
  };
}
