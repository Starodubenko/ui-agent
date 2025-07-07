import { PromptOutput } from '../models/prompt.output';

export function mapPromptToOutput(entity: any): PromptOutput {
  if (!entity) throw new Error('PromptRequest not found');
  const {
    id,
    userId,
    componentId,
    prompt,
    response,
    meta,
    createdAt,
    updatedAt,
  } = entity;
  return {
    id,
    userId,
    componentId,
    prompt,
    response,
    meta,
    createdAt,
    updatedAt,
  };
}
