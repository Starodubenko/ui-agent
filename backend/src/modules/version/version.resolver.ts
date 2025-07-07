import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VersionService } from './version.service';
import { VersionOutput } from './models/version.output';
import { CreateVersionInput } from './dto/create-version.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guards/jwt-auth.guard';

import { TestService } from '@test/test.service';
import { TestOutput } from '@test/models/test.output';

@Resolver(() => VersionOutput)
export class VersionResolver {
  constructor(
    private readonly versionService: VersionService,
    private readonly testService: TestService,
  ) {}

  @Query(() => [VersionOutput])
  @UseGuards(GqlAuthGuard)
  async versions(
    @Args('componentId') componentId: string,
  ): Promise<VersionOutput[]> {
    return this.versionService.listByComponent(componentId);
  }

  @Query(() => VersionOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async version(@Args('id') id: string): Promise<VersionOutput | null> {
    return this.versionService.findById(id);
  }

  @Mutation(() => VersionOutput)
  @UseGuards(GqlAuthGuard)
  async createVersion(
    @Args('input') input: CreateVersionInput,
  ): Promise<VersionOutput> {
    return this.versionService.create(input);
  }

  @ResolveField(() => [TestOutput])
  tests(@Parent() version: VersionOutput) {
    return this.testService.listByVersion(version.id);
  }
}
