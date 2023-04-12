import merge from 'lodash/merge';

const resolvers = merge({}, ...[require('./healthcheck'), require('./user'), require('./bit'), require('./comment')]);

export default resolvers;
