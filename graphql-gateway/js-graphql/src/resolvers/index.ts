import merge from 'lodash/merge';

const resolvers = merge({}, ...[require('./healthcheck'), require('./user-impl'), require('./bit-impl')]);

export default resolvers;
