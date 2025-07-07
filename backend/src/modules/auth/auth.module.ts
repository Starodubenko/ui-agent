import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { AppConfigService } from '@config/config.service';
import { PrismaModule } from '@prisma/prisma.module';
import { LoginHandler } from './commands/login.handler';
import { RegisterHandler } from './commands/register.handler';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AppConfigModule } from '@config/config.module';

const CommandHandlers = [LoginHandler, RegisterHandler];

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CqrsModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        secret: config.jwtKey,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, ...CommandHandlers],
  exports: [AuthService],
})
export class AuthModule {}
