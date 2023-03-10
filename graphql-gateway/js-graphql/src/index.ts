import { ApolloServer } from 'apollo-server';

import typeDefs from './schemas';
import resolvers from './resolvers';

const startServer = async () => {
    const server = new ApolloServer({
      typeDefs: await typeDefs,
      resolvers,
    });
    
    const { url } = await server.listen();

    console.log(`? Server ready at ${url}`);
}

startServer();

