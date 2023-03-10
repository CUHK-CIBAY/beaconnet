const healthcheck = () => 'OK';

const resolvers = {
    Query: {
        healthcheck: () => 'OK'
    }
}

module.exports = resolvers;
