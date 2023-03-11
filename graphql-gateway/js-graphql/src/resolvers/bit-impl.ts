import { bits } from '../mock-data';

const resolvers = {
    Query: {
        bits: () => bits,
    }
}

module.exports = resolvers;
