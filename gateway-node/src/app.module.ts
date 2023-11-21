import { GatewayConfig, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { subgraphs } from './remotes/subgraphs.remote';
import { handleAuth } from './context/auth.context';
import { AuhthenticatedDataSource } from './config/authenticate.config';
import { CommonModule } from './common/common.module';
import { readFileSync, writeFileSync } from 'fs';
import { SubgraphsRemoteEnum } from './enums/subgraph.enum';
import { AppController } from './app.controller';
import { AppService } from './app.service';

let supergraphUpdate;

async function buildGateway() {
  const prodSchema = readFileSync('./prod-schema.graphql', 'utf-8').toString();
  const gateway: GatewayConfig = {
    buildService: ({ name, url }) => new AuhthenticatedDataSource({ url }),
    supergraphSdl: async ({ update }) => {
      supergraphUpdate = update;
      return {
        supergraphSdl: prodSchema,
      };
    },
  };
  return gateway;
}
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const prodSchema = readFileSync(
          './prod-schema.graphql',
          'utf-8',
        ).toString();
        return {
          gateway: {
            buildService: ({ name, url }) =>
              new AuhthenticatedDataSource({ url }),
            supergraphSdl: process.env.STATE === 'prod' ? buildGateway() : new IntrospectAndCompose({
              pollIntervalInMs: 5,
              subgraphs: subgraphs(),
            })
          },
          server: {
            csrfPrevention: false,
            playground: false,
            introspection: true,

            plugins: [
              process.env.STATE === 'dev'
                ? ApolloServerPluginLandingPageLocalDefault()
                : ApolloServerPluginLandingPageDisabled(),
              ApolloServerPluginInlineTrace(),
            ],
            context: handleAuth,
          },
        };
      },
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
