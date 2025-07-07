export type BasePromptParams = {
  title: string;
  technologies: string[];
  styles: string[];
  extra?: string;
};

export function getBasePrompt(params: BasePromptParams): string {
  return [
    `Твоя задача: сгенерировать компонент "${params.title}" по заданному ТЗ.`,
    '',
    'Технологии:',
    ...params.technologies.map((t) => `- ${t}`),
    '',
    'Особенности стилизации:',
    ...params.styles.map((s) => `- ${s}`),
    '',
    params.extra || '',
  ].join('\n');
}
