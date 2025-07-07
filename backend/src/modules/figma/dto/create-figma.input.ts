import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFigmaInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  componentId?: string;

  @Field()
  fileId: string;

  @Field({ nullable: true })
  nodeId?: string;

  @Field(() => String)
  meta: any;
}
