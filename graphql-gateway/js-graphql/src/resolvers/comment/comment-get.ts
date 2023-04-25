import * as dotenv from 'dotenv';

dotenv.config();

export const findComment = async (_p: any, { id }: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH (c:Comment {id: $id}) RETURN c';
    const result = await session.run(query, { id });
    return result.records[0].get('c').properties;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const getUserComment = async (_p: any, { id }: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH (:User { id: $id })-[:COMMENTED]->(c:Comment) RETURN c';
    const result = await session.run(query, { id });
    return result.records.map((record: any) => record.get('c').properties);
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

export const getBitComment = async (_p: any, { id }: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH (c:Comment)-[:ON]->(b:Bit { id: $id }) RETURN c';
    const result = await session.run(query, { id });
    return result.records.map((record: any) => record.get('c').properties);
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};
