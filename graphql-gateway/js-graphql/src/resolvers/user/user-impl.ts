import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const userBitsResolver = async ({ id }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH(:User {id: $id})-[:POST]->(b:Bit) RETURN b';
    const result = await session.run(query, { id });
    return result.records.map((record) => record.get('b').properties);
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = userBitsResolver;
