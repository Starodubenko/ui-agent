export class CreateFigmaCommand {
  constructor(
    public readonly userId: string,
    public readonly componentId: string | undefined,
    public readonly fileId: string,
    public readonly nodeId: string | undefined,
    public readonly meta: any,
  ) {}
}
