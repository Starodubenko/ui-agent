import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFigmaInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  fileId?: string;

  @Field({ nullable: true })
  nodeId?: string;

  @Field(() => String, { nullable: true })
  meta?: any;
}
