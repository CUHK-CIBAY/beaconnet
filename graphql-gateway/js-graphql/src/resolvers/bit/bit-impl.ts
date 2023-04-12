import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const bitResolver = async ({ id }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User)-[:POST]->(:Bit {id: $id})
            RETURN u
        `;
    const result = await session.run(query, { id });
    return result.records[0].get('u').properties
    ;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = bitResolver;
