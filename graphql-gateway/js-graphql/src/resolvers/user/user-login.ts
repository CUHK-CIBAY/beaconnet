import * as dotenv from 'dotenv';
import { User } from '../../gql.types';
import driver from '../../util/neo4j-driver';

dotenv.config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* eslint-disable */
const createToken = async ({ id, email, username }: User) =>
  jwt.sign({ id, email, username }, process.env.SERCET, { expiresIn: '1d' });
/* eslint-enable */

const userLoginResolver = async (_p: any, { input }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const { email, username, password } = input;
    let query = '';
    let result: any;
    let user;
    if (email) {
      query = 'MATCH (u:User {email: $email})-[:HAS]->(uInfo) RETURN u, uInfo';
      result = await session.run(query, { email });
    } else if (username) {
      query = 'MATCH (u:User {username: $username})-[:HAS]->(uInfo) RETURN u, uInfo';
      result = await session.run(query, { username });
    } else {
      throw new Error('Please input email/username');
    }

    if (result.records.length === 0) throw Error('Username Not Exist');
    user = result.records[0].get('u').properties;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw Error('Wrong Password');
    return { token: await createToken(user) };
  }
  catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = userLoginResolver;
