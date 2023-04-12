import * as dotenv from 'dotenv';
import { User } from '../../gql.types';
import driver from '../../util/neo4j-driver';

dotenv.config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* eslint-disable */
const createToken = async ({ id, email, username }: User) =>
  jwt.sign({ id, email, username }, process.env.SECRET, { expiresIn: '1d' });
/* eslint-enable */

const userLoginResolver = async (_p: any, { input }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const { email, username, password } = input;
    let query = '';
    let result;

    if (email) {
      query = 'MATCH (u:User {email: $email}) RETURN u';
      result = await session.run(query, { email });
    } else if (username) {
      query = 'MATCH (u:User {username: $username}) RETURN u';
      result = await session.run(query, { username });
    } else {
      throw new Error('Please input email/username');
    }

    if (result.records.length === 0) throw Error('Username/Email Not Exist');

    const user = result.records[0].get('u').properties;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw Error('Wrong Password');
    return { token: await createToken(user) };
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = userLoginResolver;
