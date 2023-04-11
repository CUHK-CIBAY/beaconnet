import * as dotenv from 'dotenv';
import { User } from '../../gql.types';
import driver from '../../util/neo4j-driver';

dotenv.config();

const islikedBit = async (_p: any, {bid}: any, {me}: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = ` MATCH (b:Bit {id: $bid}) MATCH(u:User {id: $uid})
    RETURN if(((:User {id: $uid}) EXISTS (b:Bit {id: $likeGivers})) != NULL) AS isliked`;;
    const result = await session.run(query, {id: bid, uid: me.id });
    //return boolean where Bit.likeGivers === User.id 
    return result.records[0].get('isliked');
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = islikedBit;