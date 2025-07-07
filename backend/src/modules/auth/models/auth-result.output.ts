import { ObjectType, Field } from '@nestjs/graphql';
import { UserOutput } from '@user/models/user.output';

@ObjectType()
export class AuthResultOutput {
  @Field(() => UserOutput)
  user: UserOutput;

  @Field()
  accessToken: string;
}
