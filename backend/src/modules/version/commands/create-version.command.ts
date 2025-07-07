export class CreateVersionCommand {
  constructor(
    public readonly componentId: string,
    public readonly name: string,
    public readonly code: string,
    public readonly meta: any,
  ) {}
}
