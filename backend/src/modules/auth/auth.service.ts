import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './commands/login.command';
import { RegisterCommand } from './commands/register.command';
import { AuthResultOutput } from './models/auth-result.output';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  login(email: string, password: string): Promise<AuthResultOutput> {
    return this.commandBus.execute(new LoginCommand(email, password));
  }

  register(email: string, password: string): Promise<AuthResultOutput> {
    return this.commandBus.execute(new RegisterCommand(email, password));
  }
}
