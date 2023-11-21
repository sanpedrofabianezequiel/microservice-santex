import { SubgraphsRemoteEnum } from 'src/enums/subgraph.enum';

export const subgraphs = () => {
  const subgraphs = [
    {
      name: SubgraphsRemoteEnum.PROFILE_NODE,
      url:
        process.env.STATE === 'prod'
          ? process.env.PROFILE_NODE_URL
          : 'http://localhost:3002/graphql',
    },
    {
      name: SubgraphsRemoteEnum.BUSINESS_NODE,
      url:
        process.env.STATE === 'prod'
          ? process.env.BUSINESS_NODE_URL
          : 'http://localhost:3003/graphql',
    },
  ];
  return subgraphs;
};
