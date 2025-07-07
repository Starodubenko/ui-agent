import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResultOutput } from './models/auth-result.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResultOutput)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input.email, input.password);
  }

  @Mutation(() => AuthResultOutput)
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input.email, input.password);
  }
}
