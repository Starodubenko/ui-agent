import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';
import { AuthResultOutput } from '../models/auth-result.output';
import { RegisterCommand } from './register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand): Promise<AuthResultOutput> {
    const { email, password } = command;
    const exists = await this.userService.findByEmail(email);
    if (exists) throw new Error('Email already in use');
    const user = await this.userService.createUser(email, password);
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { user, accessToken };
  }
}
