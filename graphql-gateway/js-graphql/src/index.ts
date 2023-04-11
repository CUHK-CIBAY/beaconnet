import { createSchema, createYoga } from 'graphql-yoga';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import typeDefs from './schemas';
import resolvers from './resolvers';

import baseContext from './context/baseContext';

export const handler = async (event: APIGatewayEvent, lambdaContext: Context): Promise<APIGatewayProxyResult> => {
  const yoga = createYoga<{
    event: APIGatewayEvent;
    lambdaContext: Context;
  }>({
    schema: createSchema({
      typeDefs: await typeDefs,
      resolvers,
    }),
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
