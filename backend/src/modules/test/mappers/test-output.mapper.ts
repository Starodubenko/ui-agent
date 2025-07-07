import { TestOutput } from '../models/test.output';

export function mapTestToOutput(entity: any): TestOutput {
  if (!entity) throw new Error('Test not found');
  const { id, componentVersionId, name, code, meta, createdAt } = entity;
  return { id, componentVersionId, name, code, meta, createdAt };
}
