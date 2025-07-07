import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateFigmaInput {
  @Field()
  fileId: string;

  @Field({ nullable: true })
  nodeId?: string;

  @Field(() => [String], { nullable: true })
  technologies?: string[];

  @Field(() => [String], { nullable: true })
  styles?: string[];

  @Field({ nullable: true })
  extra?: string;
}
