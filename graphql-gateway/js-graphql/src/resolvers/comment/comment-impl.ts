import * as dotenv from 'dotenv';

dotenv.config();

export const getCommenOwner = async (p: any, _a: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User)-[:COMMENTED]->(:Comment {id: $id})
            RETURN u
        `;
    const result = await session.run(query, { id: p.id });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const getCommentBit = async (p: any, _a: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (:Comment {id: $id})-[:ON]->(b:Bit)
            RETURN b
        `;
    const result = await session.run(query, { id: p.id });
    return result.records[0].get('b').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
