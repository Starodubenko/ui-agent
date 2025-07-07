import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TestOutput {
  @Field(() => ID)
  id: string;

  @Field()
  componentVersionId: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => String)
  meta: any;

  @Field()
  createdAt: Date;
}
