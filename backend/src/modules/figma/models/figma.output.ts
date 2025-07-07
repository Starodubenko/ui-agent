import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class FigmaOutput {
  @Field(() => ID)
  id: string;

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
