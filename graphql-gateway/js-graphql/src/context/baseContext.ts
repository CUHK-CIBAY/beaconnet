// import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

// const driver = neo4j.driver(
//     process.env.DB_URL ?? '',
//     neo4j.auth.basic(process.env.DB_USER ?? '', process.env.DB_PASSWORD ?? ''),
// );

const baseContext = async ({ req }: any) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const me = await jwt.verify(token, process.env.SERCET);
            return{ me };
        } catch (error) {
            console.error(error);
            throw new Error('Your session expired. Please sign in again.');
        }
    }
}

export default baseContext;
