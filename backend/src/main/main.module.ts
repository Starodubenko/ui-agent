import { VersionService } from '@version/version.service';
import { Module, forwardRef } from '@nestjs/common';
import { PromptModule } from '@prompt/prompt.module';
import { FigmaApiService } from '@shared/figma/figma-api.service';
import { MainResolver } from './main.resolver';
import { MainService } from './main.service';
import { AppConfigModule } from '@config/config.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [AppConfigModule, CqrsModule, forwardRef(() => PromptModule)],
  providers: [MainService, MainResolver, FigmaApiService, VersionService],
})
export class MainModule {}
