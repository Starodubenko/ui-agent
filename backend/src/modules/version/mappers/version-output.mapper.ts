import { VersionOutput } from '../models/version.output';

export function mapVersionToOutput(entity: any): VersionOutput {
  if (!entity) throw new Error('ComponentVersion not found');
  const { id, name, componentId, code, meta, createdAt, tests } = entity;
  return { id, name, componentId, code, meta, createdAt, tests };
}
