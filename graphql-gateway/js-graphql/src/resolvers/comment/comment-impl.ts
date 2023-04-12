import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const commentResolver = async (p: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User)-[:COMMENTED]->(:Comment {id: $id})-[:ON]->(b:Bit)
            RETURN u, b
        `;
    const result = await session.run(query, { id: p.id });
    return {
      ...p,
      User: result.records[0].get('u').properties,
      Bit: result.records[0].get('b').properties,
    };
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = commentResolver;
