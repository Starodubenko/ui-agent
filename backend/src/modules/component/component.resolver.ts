import { GqlAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VersionOutput } from '@version/models/version.output';
import { VersionService } from '@version/version.service';
import { ComponentService } from './component.service';
import { CreateComponentInput } from './dto/create-component.input';
import { ComponentOutput } from './models/component.output';

@Resolver(() => ComponentOutput)
export class ComponentResolver {
  constructor(
    private readonly componentService: ComponentService,
    private readonly versionService: VersionService,
  ) {}

  @Query(() => [ComponentOutput])
  @UseGuards(GqlAuthGuard)
  myComponents(@Context() context): Promise<ComponentOutput[]> {
    const { user } = context.req;
    return this.componentService.listByUser(user.userId);
  }

  @Query(() => ComponentOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  component(@Args('id') id: string): Promise<ComponentOutput | null> {
    return this.componentService.findById(id);
  }

  @Mutation(() => ComponentOutput)
  @UseGuards(GqlAuthGuard)
  createComponent(
    @Context() context,
    @Args('input') input: CreateComponentInput,
  ): Promise<ComponentOutput> {
    const { user } = context.req;
    return this.componentService.create(user.userId, input);
  }

  @ResolveField(() => [VersionOutput])
  versions(@Parent() component: ComponentOutput) {
    return this.versionService.listByComponent(component.id);
  }
}
