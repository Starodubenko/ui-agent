import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { AuthResultOutput } from '../models/auth-result.output';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<AuthResultOutput> {
    const { email, password } = command;
    const user = await this.userService.validateUser(email, password);
    if (!user) throw new Error('Invalid credentials');
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { user, accessToken };
  }
}
