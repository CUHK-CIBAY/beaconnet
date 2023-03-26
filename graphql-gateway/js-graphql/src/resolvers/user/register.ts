import { MutationRegisterArgs } from '../../gql.types';
import * as dotenv from 'dotenv';

dotenv.config();

const bcrypt = require('bcrypt');

const userRegisterResolver = async (_p: any, { input }: MutationRegisterArgs, { driver }:any) => {
    const session = driver.session({ database: 'neo4j' });
    try {
        const { username, email, password } = input;
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        let query = `MATCH (u:User) WHERE u.username = $username OR u.email = $email RETURN u`
        let result = await session.run(query, {username, email});
        if(result.records.length > 0) throw Error('username or email is used');
        result = await session.run('MATCH (:User) WITH toString(COUNT(*) + 1) as count CREATE (u:User {id: count, username: $username, password: $password, email: $email}) RETURN u', { username, password: hashedPassword, email });
        return result.records[0].get('u').properties;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await session.close();
    }
};

module.exports = userRegisterResolver;
