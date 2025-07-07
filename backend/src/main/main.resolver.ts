import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guards/jwt-auth.guard';
import { MainService } from './main.service';
import { GenerateComponentInput } from './dto/generate-component.input';
import { GenerateFigmaInput } from './dto/generate-figma.input';
import { GenerateTestsInput } from './dto/generate-tests.input';
import { GenerateResultOutput } from './models/generate-result.output';

@Resolver()
export class MainResolver {
  constructor(private readonly mainService: MainService) {}

  @Mutation(() => GenerateResultOutput)
  @UseGuards(GqlAuthGuard)
  async generateComponentByPrompt(
    @Context() context,
    @Args('input') input: GenerateComponentInput,
  ): Promise<GenerateResultOutput> {
    return this.mainService.generateComponentByPrompt(
      context.req.user.userId,
      input,
    );
  }

  @Mutation(() => GenerateResultOutput)
  @UseGuards(GqlAuthGuard)
  async generateComponentByFigma(
    @Context() context,
    @Args('input') input: GenerateFigmaInput,
  ): Promise<GenerateResultOutput> {
    return this.mainService.generateComponentByFigma(
      context.req.user.userId,
      input,
    );
  }

  @Mutation(() => GenerateResultOutput)
  @UseGuards(GqlAuthGuard)
  async generateTestsForComponent(
    @Context() context,
    @Args('input') input: GenerateTestsInput,
  ): Promise<GenerateResultOutput> {
    return this.mainService.generateTestsForComponent(
      context.req.user.userId,
      input,
    );
  }
}
