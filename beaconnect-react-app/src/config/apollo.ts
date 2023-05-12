import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AUTH from './constants';

const httpLink = createHttpLink({
 uri: 'https://h8e9hgszz8.execute-api.ap-southeast-1.amazonaws.com/Prod/graphql',
});

const authLink = setContext((_, { headers }) => {
  const tokenString = localStorage.getItem(AUTH.token);
  try {
    const token = tokenString ? JSON.parse(tokenString) : null;

    // Check if token is expired
    if (token) {
      const now = new Date();
      if (now.getTime() > token.expiry) {
        localStorage.clear();
        window.location.reload();
      }
    }

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        'x-token': token ? window.atob(token.value).split('::')[0] : '',
      },
    };
  } catch (e) {
    // If token is invalid, clear local storage and reload page
    localStorage.clear();
    window.location.reload();
    return {};
  }
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    // Output error to console
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Response: ${response}`);
    });
  }
  if (networkError) {
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // If not authorized, clear local storage and reload page
      localStorage.removeItem(AUTH.token);
      window.location.reload();
    } else {
      console.log(`[Network error]: ${networkError}`);
    }
  }
});

// Create Apollo client
const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
