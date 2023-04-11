import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const isLikedBit = async (_p: any, { id }: any, { me }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = `
			MATCH (:User {id: $uid})-[r:LIKED]->(:Bit {id: $bid})
    	RETURN EXISTS(r) AS isLiked
		`;
    const result = await session.run(query, {id: id, uid: me.id }); 
    return result.records[0].get('isLiked');
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = isLikedBit;
