import { User } from '../../gql.types';
import * as dotenv from 'dotenv';

dotenv.config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = async ({ id, email, username }: User) => (
    jwt.sign({ id, email, username }, process.env.SERCET, { expiresIn: '1d'})
);

const userLoginResolver = async (_p: any, { input }: any, { driver }:any ) => {
    const session = driver.session({ database: 'neo4j' });
    try {
        const { email, password } = input;
        let query = `MATCH (u:User {email: $email}) RETURN u`;
        let result = await session.run(query, {email});
        if(result.records.length === 0) throw Error('Username Not Exist');
        const user = result.records[0].get('u').properties;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw Error('Wrong Password');
        return { token: await createToken(user) };
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await session.close();
    }
};

module.exports = userLoginResolver;
