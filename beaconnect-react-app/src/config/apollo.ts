import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // Warning: This is a local server, not the production server
  // Warning: Please switch to https when deploying to production
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

export default client;
