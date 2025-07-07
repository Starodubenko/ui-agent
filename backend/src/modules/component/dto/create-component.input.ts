import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateComponentInput {
  @Field()
  name: string;
}
