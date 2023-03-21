import { User, MutationUpdateInfoArgs } from '../../gql.types';
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.DB_URL ?? '',
  neo4j.auth.basic(process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? ''),
);

export const userInfoResolver = ({ info }: User) => ({ gender: info?.gender });

export const updateUserInfo = async (_p: any, { input }: MutationUpdateInfoArgs): Promise<User | null> => {
  const session = driver.session({ database: 'neo4j' });
  try {
    let query = `
            MERGE (u:User {id: '1'})-[:HAS]->(i:UserInfo)
            SET i = $input
            RETURN u
        `;
    let result = await session.executeWrite((tx) => tx.run(query, { input }));
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
