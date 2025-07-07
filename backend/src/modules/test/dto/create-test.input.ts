import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTestInput {
  @Field()
  componentVersionId: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => String)
  meta: any;
}
