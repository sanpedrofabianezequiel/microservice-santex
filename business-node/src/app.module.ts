import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { FootballModule } from './football/football.module';
import { User } from './football/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      introspection: true,
      autoSchemaFile: true,
      plugins: [
        process.env.STATE === 'dev'
          ? ApolloServerPluginLandingPageLocalDefault()
          : ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginInlineTrace(),
      ],
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    AuthModule,
    FootballModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
