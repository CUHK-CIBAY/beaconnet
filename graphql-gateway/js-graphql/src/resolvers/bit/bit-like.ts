import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const likeBit = async (_p: any, { id }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    let query = `
            MATCH (b:Bit {id: $bid})
            RETURN EXISTS((:User {id: $uid})-[:LIKED]->(b)) AS LIKED, b`;
    let result = await session.run(query, { uid: me.id, bid: id });
    if (!result.records[0]) {
      throw Error('Bit Not Exist');
    }
    if (!result.records[0].get('LIKED')) {
      query = `
            MATCH (u:User {id: $uid})
            MATCH (b:Bit {id: $bid})
            SET b.totalLike = b.totalLike + 1
            CREATE (u)-[:LIKED]->(b) RETURN b
        `;
    } else {
      query = `
            MATCH (:User {id: $uid})-[l:LIKED]->(b:Bit {id: $bid}) 
            SET b.totalLike = b.totalLike - 1
            DELETE l 
            RETURN b
        `;
    }
    result = await session.run(query, { uid: me.id, bid: id });
    return result.records[0].get('b').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = likeBit;
