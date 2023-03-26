import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.DB_URL ?? '',
  neo4j.auth.basic(process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? ''),
);

const userResolver = async (_p: any, _a: any, { me }: any) => {
    if(!me) throw new Error('Please login first');
    console.log(me.id);
    console.log(typeof(me.id));
    const session = driver.session({ database: 'neo4j' });
    try {
        const query = 'MATCH(u:User {id: $id}) RETURN u';
        const result = await session.run(query, { id: me.id });
        console.log(result.summary.query.parameters);
        return result.records[0].get('u').properties; 
    } catch(error) {
        console.error(error);
        return null;
    } finally {
        await session.close();
    }
};

module.exports = userResolver;

