import { GqlAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFigmaInput } from './dto/create-figma.input';
import { UpdateFigmaInput } from './dto/update-figma.input';
import { FigmaService } from './figma.service';
import { FigmaOutput } from './models/figma.output';

@Resolver(() => FigmaOutput)
export class FigmaResolver {
  constructor(private readonly figmaService: FigmaService) {}

  @Query(() => [FigmaOutput])
  @UseGuards(GqlAuthGuard)
  myFigmaFiles(@Context() context): Promise<FigmaOutput[]> {
    const { user } = context.req;
    return this.figmaService.listByUser(user.userId);
  }

  @Query(() => FigmaOutput, { nullable: true })
  @UseGuards(GqlAuthGuard)
  figma(@Args('id') id: string): Promise<FigmaOutput | null> {
    return this.figmaService.findById(id);
  }

  @Mutation(() => FigmaOutput)
  @UseGuards(GqlAuthGuard)
  createFigma(
    @Context() context,
    @Args('input') input: CreateFigmaInput,
  ): Promise<FigmaOutput> {
    return this.figmaService.create({
      ...input,
      userId: context.req.user.userId,
    });
  }

  @Mutation(() => FigmaOutput)
  @UseGuards(GqlAuthGuard)
  updateFigma(@Args('input') input: UpdateFigmaInput): Promise<FigmaOutput> {
    return this.figmaService.update(input);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async deleteFigma(@Args('id') id: string): Promise<string> {
    await this.figmaService.delete(id);
    return id;
  }
}
