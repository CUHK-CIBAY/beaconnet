import * as dotenv from 'dotenv';

dotenv.config();

const showUsers = async (_p: any, _a: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH (u: User) RETURN u';
    const result = await session.run(query);
    const users = result.records.map((record: any) => record.get('u').properties);
    return users;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = showUsers;
