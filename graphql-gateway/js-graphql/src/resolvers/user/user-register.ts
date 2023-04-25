import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { MutationRegisterArgs } from '../../gql.types';

dotenv.config();

const bcrypt = require('bcryptjs');

const userRegisterResolver = async (_p: any, { input }: MutationRegisterArgs, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const { username, email, password } = input;
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    let query = `
        MATCH (u:User)
        WHERE u.username = $username
        OR u.email = $email
        RETURN u
    `;
    let result = await session.run(query, { username, email });
    if (result.records.length > 0) throw Error('username or email is used');
    query = `
        CREATE (u:User {id: $id, username: $username, password: $password, email: $email, role: "NORMAL"}) 
        RETURN u
    `;
    result = await session.run(query, {
      id: uuidv4(),
      username,
      password: hashedPassword,
      email,
    });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = userRegisterResolver;
