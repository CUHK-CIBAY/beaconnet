import * as dotenv from 'dotenv';
import { User } from '../../gql.types';
import driver from '../../util/neo4j-driver';



const userFollowResolver = async (_p: any, { input }: any,
  context: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const { userIdToFollow } = input;

    if (!context.user) {
      throw new Error('Authentication required');
    }

    const { id: uid } = context.user;

    const checkQuery = `
      MATCH (u:User {id: $uid})-[:FOLLOWS]->(target:User {id: $userIdToFollow})
      RETURN target
    `;
    const checkResult = await session.run(checkQuery, { uid, userIdToFollow });
    if (checkResult.records.length > 0) {
      throw new Error('User is already following the target user');
    }

    const createQuery = `
      MATCH (u:User {id: $uid}), (target:User {id: $userIdToFollow})
      CREATE (u)-[:FOLLOWS]->(target)
      RETURN target
    `;
    const createResult = await session.run(createQuery, { uid, userIdToFollow });

    return createResult.records[0].get('target').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
}

  module.exports = userFollowResolver;