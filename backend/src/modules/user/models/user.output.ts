import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ComponentOutput } from '@component/models/component.output';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [ComponentOutput])
  components: ComponentOutput[];
}
