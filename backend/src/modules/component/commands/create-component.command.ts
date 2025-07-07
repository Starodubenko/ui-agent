export class CreateComponentCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
  ) {}
}
