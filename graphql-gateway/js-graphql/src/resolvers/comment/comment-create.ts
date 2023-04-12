import * as dotenv from 'dotenv';
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
            MATCH (:Comment)
            WITH u, b, toString(COUNT(*) + 1) as count
            CREATE (c:Comment {
                   id: count,
                   content: $content,
                   createAt: $createAt
            }) 
            CREATE (u)-[:COMMENTED]->(c)-[:ON]->(b)
            RETURN c
        `;
    const result = await session.run(query, {
      bid: id,
      uid: me.id,
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
