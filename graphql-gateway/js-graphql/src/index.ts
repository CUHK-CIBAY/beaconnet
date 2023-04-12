import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';

import typeDefs from './schemas';
import resolvers from './resolvers';

import baseContext from './context/baseContext';

const main = async () => {
  const yoga = createYoga({
    schema: createSchema(
      {
        typeDefs: await typeDefs,
        resolvers
      }
    ),
    context: baseContext
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })
}

main();
