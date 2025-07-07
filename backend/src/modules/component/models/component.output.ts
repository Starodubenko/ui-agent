import { ObjectType, Field, ID } from '@nestjs/graphql';
import { VersionOutput } from '@version/models/version.output';

@ObjectType()
export class ComponentOutput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [VersionOutput])
  versions: VersionOutput[];
}
