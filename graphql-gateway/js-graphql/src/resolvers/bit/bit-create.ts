import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import driver from '../../util/neo4j-driver';

dotenv.config();

export const postBitResolver = async (_p: any, { content, image = '' }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $uid})
            WITH u
            MERGE (b:Bit {
                   id: $bid,
                   content: $content,
                   createAt: $createAt,
                   totalLike: $totalLike,
                   image: $image
            })
            MERGE (u)-[:POST]->(b)
            RETURN b
        `;
    const result = await session.run(query, {
      uid: me.id,
      bid: uuidv4(),
      image,
      content,
      createAt: new Date().toISOString(),
      totalLike: 0,
    });
    return result.records[0].get('b').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const reBitResolver = async (_p: any, { content, id }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $uid})
            WITH u
            MATCH (b1:Bit {id: $bid1})
            WITH u, b1
            MERGE (b2:Bit {
                   id: $bid2,
                   content: $content,
                   createAt: $createAt,
                   totalLike: $totalLike
            })
            MERGE (u)-[:POST]->(b2)
            MERGE (b2)-[:REBITED]->(b1)
            RETURN b2
        `;
    const result = await session.run(query, {
      uid: me.id,
      bid1: id,
      bid2: uuidv4(),
      content,
      createAt: new Date().toISOString(),
      totalLike: 0,
    });
    return result.records[0].get('b2').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
