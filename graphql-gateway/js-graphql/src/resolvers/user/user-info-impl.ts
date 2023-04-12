import * as dotenv from 'dotenv';
import { User, MutationUpdateInfoArgs } from '../../gql.types';
import driver from '../../util/neo4j-driver';

dotenv.config();

export const userInfoResolver = async ({ id }: User) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (:User {id: $id})-[:HAS]->(i:UserInfo)
            RETURN i
        `;
    const result = await session.run(query, { id });
    return result.records[0]?.get('i').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const updateUserInfo = async (_p: any, { input }: MutationUpdateInfoArgs, { me }: any): Promise<User | null> => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $id})
            MERGE (u)-[:HAS]->(i:UserInfo)
            SET i += $input
            RETURN u
        `;
    const result = await session.run(query, { input, id: me.id });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
