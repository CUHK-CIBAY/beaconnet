import { MutationRegisterArgs } from '../../gql.types';
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.DB_URL ?? '',
  neo4j.auth.basic(process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? ''),
);

const userRegisterResolver = async (_p: any, { input }: MutationRegisterArgs) => {
    const session = driver.session({ database: 'neo4j' });
    try {
        const { username, email, password } = input;
        let query = `MATCH (u:User) WHERE u.username = $username OR u.email = $email RETURN u`
        let result = await session.run(query, {username, email});
        
        if(result.records.length > 0) {
            throw {
                username: 'username already in use',
                status: 400
            }
        }
        result = await session.run('MATCH (:User) WITH toString(COUNT(*) + 1) as count CREATE (u:User {username: $username, password: $password, email: $email}) SET u.id = count RETURN u, count', { username, password, email });
        return {
        ...result.records[0].get('u').properties,
        ...result.records[0].get('count').properties
        };
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await session.close();
    }
};

module.exports = userRegisterResolver;
