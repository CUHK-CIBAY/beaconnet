import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

const driver = neo4j.driver(
  process.env.DB_URL ?? '',
  neo4j.auth.basic(process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? ''),
);

const baseContext = async ({ request }: any) => {
  const token = request.headers.get('x-token');
  if (token) {
    try {
      const me = await jwt.verify(token, process.env.SECRET);
      return { me, driver };
    } catch (error) {
      console.error(error);
      throw new Error('Your session expired. Please sign in again.');
    }
  }
  return { driver };
};

export default baseContext;
