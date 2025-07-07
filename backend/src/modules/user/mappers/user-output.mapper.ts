import { UserOutput } from '../models/user.output';

export function mapUserToOutput(user: any): UserOutput {
  if (!user) throw new Error('User not found');
  const { id, email, createdAt, updatedAt, components } = user;
  return { id, email, createdAt, updatedAt, components };
}
