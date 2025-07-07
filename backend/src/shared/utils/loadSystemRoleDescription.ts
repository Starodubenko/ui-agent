import { readFile } from 'fs/promises';
import { join } from 'path';

export const loadSystemRoleDescription = async (
  roleDir: string,
): Promise<string> => {
  const roleFiles = [
    'systemRole.md',
    // 'architect.md',
    // 'frontend.md',
    // 'backend.md',
  ];

  console.log(roleDir);

  const roleContents = await Promise.all(
    roleFiles.map(async (file) => {
      const fullPath = join(roleDir, file);
      const content = await readFile(fullPath, 'utf-8');
      // const label = file.replace('.md', '');
      return `${content.trim()}`;
    }),
  );

  return `# Описание ролей участников процесса\n\n${roleContents.join('\n\n---\n\n')}`;
};
