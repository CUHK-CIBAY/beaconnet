import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

export const postBitResolver = async (_p: any, { content, image }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $id})
            WITH u
            MATCH (:Bit)
            WITH u, toString(COUNT(*) + 1) as count
            MERGE (b:Bit {
                   id: count,
                   content: $content,
                   createAt: $createAt,
                   totalLike: $totalLike,
                   image: $image,
                   likeGivers: []
            })
            MERGE (u)-[:POST]->(b)
            RETURN b
        `;
    const result = await session.run(query, {
      id: me.id,
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
            MATCH (b1:Bit {id: $bid})
            WITH u, b1
            MATCH (:Bit)
            WITH u, b1, toString(COUNT(*) + 1) as count
            MERGE (b2:Bit {
                   id: count,
                   content: $content,
                   createAt: $createAt,
                   totalLike: $totalLike,
                   likeGivers: []
            })
            MERGE (u)-[:POST]->(b2)
            MERGE (b2)-[:REBITED]->(b1)
            RETURN b2
        `;
    const result = await session.run(query, {
      uid: me.id,
      bid: id,
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
