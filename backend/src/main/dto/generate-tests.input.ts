import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateTestsInput {
  @Field(() => String)
  componentVersionId: string;

  @Field(() => [String], { nullable: true })
  technologies?: string[];

  @Field(() => [String], { nullable: true })
  styles?: string[];

  @Field({ nullable: true })
  extra?: string;
}
