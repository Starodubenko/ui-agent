export class UpdateFigmaCommand {
  constructor(
    public readonly id: string,
    public readonly fileId?: string,
    public readonly nodeId?: string,
    public readonly meta?: any,
  ) {}
}
