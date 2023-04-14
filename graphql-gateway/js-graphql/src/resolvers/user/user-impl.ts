import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

export const userBitsResolver = async ({ id }: any) => {
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

export const meResolver = async (_p: any, _a: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH(u:User {id: $id}) RETURN u';
    const result = await session.run(query, { id: me.id });
    return result.records[0].get('u').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

