import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PromptOutputResponse {
  @Field()
  original: string;
  @Field()
  code: string;
}

@ObjectType()
export class GenerateResultOutput {
  @Field()
  prompt: string;

  @Field(() => PromptOutputResponse)
  response: PromptOutputResponse;

  @Field(() => String, { nullable: true })
  meta?: any;
}
