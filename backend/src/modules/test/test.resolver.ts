import { GqlAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestInput } from './dto/create-test.input';
import { UpdateTestInput } from './dto/update-test.input';
import { TestOutput } from './models/test.output';
import { TestService } from './test.service';

@Resolver(() => TestOutput)
export class TestResolver {
  constructor(private readonly testService: TestService) {}

  @Query(() => [TestOutput])
  @UseGuards(GqlAuthGuard)
  tests(
    @Args('componentVersionId') componentVersionId: string,
  ): Promise<TestOutput[]> {
    return this.testService.listByVersion(componentVersionId);
  }

  @Query(() => TestOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  test(@Args('id') id: string): Promise<TestOutput | null> {
    return this.testService.findById(id);
  }

  @Mutation(() => TestOutput)
  @UseGuards(GqlAuthGuard)
  createTest(@Args('input') input: CreateTestInput): Promise<TestOutput> {
    return this.testService.create(input);
  }

  @Mutation(() => TestOutput)
  @UseGuards(GqlAuthGuard)
  updateTest(@Args('input') input: UpdateTestInput): Promise<TestOutput> {
    return this.testService.update(input);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteTest(@Args('id') id: string): Promise<string> {
    await this.testService.delete(id);
    return id;
  }
}
