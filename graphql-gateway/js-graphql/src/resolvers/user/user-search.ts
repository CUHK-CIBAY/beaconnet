import { QueryFindUserArgs, User } from '../../gql.types';
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.DB_URL ?? '',
  neo4j.auth.basic(process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? ''),
);

const findUser = async (_p: any, { input }: QueryFindUserArgs): Promise<User | null> => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const { id, email, username } = input;
    let query = '';
    let result: any;
    if (id) {
      query = 'MATCH (u:User {id: $id})-[:HAS]->(uInfo) RETURN u, uInfo';
      result = await session.executeRead((tx) => tx.run(query, { id }));
    } else if (email) {
      query = 'MATCH (u:User {email: $email})-[:HAS]->(uInfo) = $email RETURN u, uInfo';
      result = await session.executeRead((tx) => tx.run(query, { email }));
    } else if (username) {
      query = 'MATCH (u:User {username: $username})-[:HAS]->(uInfo) RETURN u, uInfo';
      result = await session.executeRead((tx) => tx.run(query, { username }));
    } else {
      throw new Error('Please input ID/email/username');
    }
    if (result.records.length === 0) throw new Error('User not found');
    return {
      ...result.records[0].get('u').properties,
      info: result.records[0].get('uInfo').properties,
    };
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = findUser;
