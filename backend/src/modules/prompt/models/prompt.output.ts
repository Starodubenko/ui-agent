import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PromptOutput {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  componentId?: string;

  @Field()
  prompt: string;

  @Field()
  response: string;

  @Field(() => String)
  meta: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
