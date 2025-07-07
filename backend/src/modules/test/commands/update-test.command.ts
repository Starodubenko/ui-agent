export class UpdateTestCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly code?: string,
    public readonly meta?: any,
  ) {}
}
