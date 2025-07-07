import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateVersionInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;
}
