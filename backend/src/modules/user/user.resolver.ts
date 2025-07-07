import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserOutput } from './models/user.output';
import { UserService } from './user.service';

import { ComponentService } from '@component/component.service';
import { ComponentOutput } from '@component/models/component.output';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly componentService: ComponentService,
  ) {}

  @Query(() => UserOutput, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  async me(@Context() context): Promise<UserOutput | null> {
    const { user } = context.req;
    return this.userService.findById(user.userId);
  }

  @ResolveField(() => [ComponentOutput])
  components(@Parent() user: UserOutput) {
    return this.componentService.listByUser(user.id);
  }
}
