import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTestInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  meta?: any;
}
