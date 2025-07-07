import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVersionInput {
  @Field()
  componentId: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => String)
  meta: any;
}
