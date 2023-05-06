import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AUTH from './constants';

const httpLink = createHttpLink({
  uri: 'https://h8e9hgszz8.execute-api.ap-southeast-1.amazonaws.com/Prod/graphql',
});

const authLink = setContext((_, { headers }) => {
  const tokenString = localStorage.getItem(AUTH.token);
  const token = tokenString ? JSON.parse(tokenString) : null;
  if (token) {
    const now = new Date();
    if (now.getTime() > token.expiry) {
      localStorage.removeItem(AUTH.token);
      window.location.reload();
    }
  }

  return {
    headers: {
      ...headers,
      'x-token': token ? `${token.value}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Response: ${response}`);
    });
  }
  if (networkError) {
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      localStorage.removeItem(AUTH.token);
      window.location.reload();
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
