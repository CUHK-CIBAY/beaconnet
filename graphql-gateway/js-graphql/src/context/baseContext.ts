import * as dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

const baseContext = async ({ request }: any) => {
  const token = request.headers.get('x-token');
  if (token) {
    try {
      const me = await jwt.verify(token, process.env.SERCET);
      return { me };
    } catch (error) {
      console.error(error);
      throw new Error('Your session expired. Please sign in again.');
    }
  }
  return {};
};

export default baseContext;
