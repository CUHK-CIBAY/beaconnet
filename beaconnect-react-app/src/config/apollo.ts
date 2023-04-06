import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'neo4j://localhost:7687',
  cache: new InMemoryCache(),
});

export default client;
