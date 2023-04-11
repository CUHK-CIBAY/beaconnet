import { createSchema, createYoga } from 'graphql-yoga';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
//import { createServer } from 'http';

import typeDefs from './schemas';
import resolvers from './resolvers';

import baseContext from './context/baseContext';

// Uncomment the following line to run locally
//const main = async () => {
  //const yoga = createYoga({
    //schema: createSchema(
      //{
        //typeDefs: await typeDefs,
        //resolvers
      //}
    //),
    //context: baseContext
  //});
  //const server = createServer(yoga);
  //server.listen(4000, () => {
    //console.info('Server is running on http://localhost:4000/graphql')
  //})
//}

//main()
// Uncomment the above line to run locally

export const handler = async (event: APIGatewayEvent, lambdaContext: Context): Promise<APIGatewayProxyResult> => {
  const yoga = createYoga<{
    event: APIGatewayEvent;
    lambdaContext: Context;
  }>({
    schema: createSchema({
      typeDefs: await typeDefs,
      resolvers,
    }),
    context: baseContext
  });
  const response = await yoga.fetch(
    event.path + '?' + new URLSearchParams((event.queryStringParameters as Record<string, string>) || {}).toString(),
    {
      method: event.httpMethod,
      headers: event.headers as HeadersInit,
      body: event.body ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8') : undefined,
    },
    { event, lambdaContext },
  );
  const responseHeaders = Object.fromEntries(response.headers.entries());

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: await response.text(),
    isBase64Encoded: false,
  };
};
