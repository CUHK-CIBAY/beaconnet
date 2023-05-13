import * as dotenv from 'dotenv';

dotenv.config();

export const userBitsResolver = async ({ id }: any, _a: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH(:User {id: $id})-[:POST]->(b:Bit) RETURN b';
    const result = await session.run(query, { id });
    return result.records.map((record: any) => record.get('b').properties);
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const meResolver = async (_p: any, _a: any, { me, driver }: any) => {
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

export const FollowingResolver = async ({ id }: any, _a: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH (:User {id: $id})-[:FOLLOWED]->(u:User) RETURN u';
    const result = await session.run(query, { id });
    const users = result.records.map((record: any) => record.get('u').properties);
    return users;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const FollowerResolver = async ({ id }: any, _a: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH (u:User)-[:FOLLOWED]->(:User {id: $id}) RETURN u';
    const result = await session.run(query, { id });
    const users = result.records.map((record: any) => record.get('u').properties);
    return users;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
