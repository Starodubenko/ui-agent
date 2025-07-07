export class CreateTestCommand {
  constructor(
    public readonly componentVersionId: string,
    public readonly name: string,
    public readonly code: string,
    public readonly meta: any,
  ) {}
}
