import * as dotenv from 'dotenv';
import { User, MutationUpdateInfoArgs } from '../../gql.types';
import driver from '../../util/neo4j-driver';

dotenv.config();

export const userInfoResolver = ({ info }: any) => ({
  gender: info?.gender,
  username: info?.username,
  phoneNumber: info?.phoneNumber,
  email: info?.email,
  languages: info?.languages,
  birthDate: info?.birthDate,
  age: info?.age,
});

export const updateUserInfo = async (
  _p: any,
  { input }: MutationUpdateInfoArgs
): Promise<User | null> => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
      MERGE (u:User {id: '1'})-[:HAS]->(i:UserInfo)
      SET i += $input
      RETURN u
    `;
    const result = await session.run(query, { input });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};