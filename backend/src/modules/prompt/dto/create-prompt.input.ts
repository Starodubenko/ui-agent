import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromptInput {
  @Field()
  title: string;

  @Field(() => [String])
  technologies: string[];

  @Field(() => [String])
  styles: string[];

  @Field({ nullable: true })
  extra?: string;

  @Field({ nullable: true })
  componentId?: string;

  @Field(() => String, { nullable: true })
  meta?: any;
}
