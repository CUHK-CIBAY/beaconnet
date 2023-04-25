import * as dotenv from 'dotenv';

dotenv.config();

const showBits = async (_p: any, { following }: any, { me, driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    let query = '';
    if (following) {
      query = `
        MATCH (:User {id: $id})-[:FOLLOWED]->(:User)-[:POST]->(b:Bit) 
        RETURN b
      `;
    } else {
      query = 'MATCH (b:Bit) RETURN b';
    }
    const result = await session.run(query, { id: me?.id });
    const bits = result.records.map((record: any) => record.get('b').properties);
    return bits;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = showBits;
