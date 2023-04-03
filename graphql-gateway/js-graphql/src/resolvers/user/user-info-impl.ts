import { User, MutationUpdateInfoArgs } from '../../gql.types';
import driver from '../../util/neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

export const userInfoResolver = ({ info }: User) => ({ gender: info?.gender });

export const updateUserInfo = async (_p: any, { input }: MutationUpdateInfoArgs): Promise<User | null> => {
  const session = driver.session({ database: 'neo4j' });
  try {
    let query = `
            MERGE (u:User {id: '1'})-[:HAS]->(i:UserInfo)
            SET i = $input
            RETURN u
        `;
    let result = await session.run(query, { input });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
