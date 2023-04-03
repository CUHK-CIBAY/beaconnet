import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const userResolver = async (_p: any, _a: any, { me }: any) => {
  if (!me) throw new Error('Please login first');
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

module.exports = userResolver;
