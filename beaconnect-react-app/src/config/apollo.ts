import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AUTH from './constants';

const httpLink = createHttpLink({
  uri: `http://${window.location.hostname}:4000/`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH.token);
  return {
    headers: {
      ...headers,
      'x-token': token ? `${token}` : '',
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
