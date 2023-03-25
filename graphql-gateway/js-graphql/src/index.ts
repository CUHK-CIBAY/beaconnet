import { ApolloServer } from 'apollo-server';

import typeDefs from './schemas';
import resolvers from './resolvers';

const jwt = require('jsonwebtoken');

const baseContext = async ({ req }: any) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const me = await jwt.verify(token, process.env.SERCET);
            return { me };
        } catch (error) {
            throw new Error('Your session expired. Please sign in again.');
        }
    }
    return {};
};

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: await typeDefs,
    resolvers,
    context: baseContext,
  });

  const { url } = await server.listen();

  console.log(`? Server ready at ${url}`);
};

startServer();
