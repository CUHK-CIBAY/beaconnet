import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const userFollowResolver = async (_p: any, { id }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const checkQuery = `
      MATCH (u:User {id: $followId})
      RETURN EXISTS((:User {id: $meId})-[:FOLLOWED]->(u)) AS FOLLOWED
    `;
    const checkResult = await session.run(checkQuery, { followId: id, meId: me.id });

    let createQuery = '';
    if (!checkResult.records[0].get('FOLLOWED')) {
      createQuery = `
        MATCH (me:User {id: $meId})
        MATCH (target:User {id: $followId})
        CREATE (me)-[:FOLLOWED]->(target)
        RETURN target
      `;
    } else {
      createQuery = `
        MATCH (:User {id: $meId})-[f:FOLLOWED]->(target:User {id: $followId})
        DELETE f
        RETURN target
      `;
    }

    const createResult = await session.run(createQuery, { followId: id, meId: me.id });
    return createResult.records[0].get('target').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = userFollowResolver;
