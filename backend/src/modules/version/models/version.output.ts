import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TestOutput } from '@test/models/test.output';

@ObjectType()
export class VersionOutput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  componentId: string;

  @Field()
  code: string;

  @Field(() => String)
  meta: any;

  @Field()
  createdAt: Date;

  @Field(() => [TestOutput])
  tests: TestOutput[];
}
