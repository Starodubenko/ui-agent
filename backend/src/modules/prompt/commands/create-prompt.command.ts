export class CreatePromptCommand {
  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly technologies: string[],
    public readonly styles: string[],
    public readonly extra?: string,
    public readonly componentId?: string,
    public readonly meta?: any,
  ) {}
}
