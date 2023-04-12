import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

export const authorResolver = async ({ id }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User)-[:POST]->(:Bit {id: $id})
            RETURN u
        `;
    const result = await session.run(query, { id });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const reBitResolver = async ({ id }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (:Bit {id: $id})-[:REBITED]->(b:Bit)
            RETURN b
        `;
    const result = await session.run(query, { id });
    return result.records[0].get('b').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

