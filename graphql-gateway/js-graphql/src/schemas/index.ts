import { readFileSync } from 'fs'

const typeDefs = readFileSync(require.resolve('./healthcheck.graphql')).toString('utf-8');

export default typeDefs;
