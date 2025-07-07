import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateComponentInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;
}
