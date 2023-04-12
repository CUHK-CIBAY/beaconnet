import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const bitPostResolver = async (_p: any, { content }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $id})
            WITH u
            MATCH (:Bit)
            WITH u, toString(COUNT(*) + 1) as count
            CREATE (b:Bit {
                   id: count,
                   content: $content,
                   createAt: $createAt,
                   totalLike: $totalLike,
                   likeGivers: []
            }) 
            CREATE (u)-[:POST]->(b)
            RETURN b
        `;
    const result = await session.run(query, {
      id: me.id,
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

module.exports = bitPostResolver;
