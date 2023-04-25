import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const deleteComment = async (_p: any, { id }: any, { driver }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
            MATCH (c:Comment {id: $id})
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

module.exports = deleteComment;
