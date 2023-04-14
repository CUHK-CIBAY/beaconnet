import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import driver from '../../util/neo4j-driver';

dotenv.config();

const commentBitResolver = async (_p: any, { id, content }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $uid})
            WITH u
            MATCH (b:Bit {id: $bid})
            WITH u, b
            MERGE (c:Comment {
                   id: $cid,
                   content: $content,
                   createAt: $createAt
            })
            MERGE (u)-[:COMMENTED]->(c)-[:ON]->(b)
            RETURN c
        `;
    const result = await session.run(query, {
      bid: id,
      uid: me.id,
      cid: uuidv4(),
      content,
      createAt: new Date().toISOString(),
    });
    return result.records[0].get('c').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = commentBitResolver;
