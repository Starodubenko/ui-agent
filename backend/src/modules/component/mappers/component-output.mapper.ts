import { ComponentOutput } from '../models/component.output';

export function mapComponentToOutput(entity: any): ComponentOutput {
  if (!entity) throw new Error('Component not found');
  const { id, name, userId, createdAt, updatedAt, versions } = entity;
  return { id, name, userId, createdAt, updatedAt, versions };
}
