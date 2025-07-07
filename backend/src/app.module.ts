import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from '@auth/auth.module';
import { ComponentModule } from '@component/component.module';
import { AppConfigModule } from '@config/config.module';
import { FigmaModule } from '@figma/figma.module';
import { MainModule } from '@main/main.module';
import { TestModule } from '@test/test.module';
import { UserModule } from '@user/user.module';
import { VersionModule } from '@version/version.module';

@Module({
  imports: [
    AppConfigModule,
    MainModule,
    AuthModule,
    UserModule,
    ComponentModule,
    VersionModule,
    TestModule,
    FigmaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // или путь к файлу (например, 'schema.gql')
      installSubscriptionHandlers: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
      // debug: true,
    }),
  ],
})
export class AppModule {}
