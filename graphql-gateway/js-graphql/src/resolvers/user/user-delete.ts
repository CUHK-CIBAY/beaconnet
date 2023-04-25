import * as dotenv from 'dotenv';

dotenv.config();

const deleteUser = async (_p: any, { id }: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (u:User {id: $id})
            DETACH DELETE u;
          `;
    await session.run(query, { id });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    await session.close();
  }
};

module.exports = deleteUser;
