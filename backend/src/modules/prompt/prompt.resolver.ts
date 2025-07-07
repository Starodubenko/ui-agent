import { GqlAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePromptInput } from './dto/create-prompt.input';
import { PromptOutput } from './models/prompt.output';
import { PromptService } from './prompt.service';

@Resolver(() => PromptOutput)
export class PromptResolver {
  constructor(private readonly promptService: PromptService) {}

  @Query(() => [PromptOutput])
  @UseGuards(GqlAuthGuard)
  async myPrompts(@Context() context): Promise<PromptOutput[]> {
    return this.promptService.listByUser(context.req.user.userId);
  }

  @Query(() => PromptOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async prompt(@Args('id') id: string): Promise<PromptOutput | null> {
    return this.promptService.findById(id);
  }

  @Mutation(() => PromptOutput)
  @UseGuards(GqlAuthGuard)
  async createPrompt(
    @Context() context,
    @Args('input') input: CreatePromptInput,
  ): Promise<PromptOutput> {
    return this.promptService.create(context.req.user.userId, input);
  }
}
