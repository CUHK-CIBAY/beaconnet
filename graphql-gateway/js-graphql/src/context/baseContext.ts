const jwt = require('jsonwebtoken');

const baseContext = async ({ req }: any) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const me = await jwt.verify(token, process.env.SERCET);
            return {me};
        } catch (error) {
            throw new Error('Your session expired. Please sign in again.');
        }
    }
    return {};
}

export default baseContext;
