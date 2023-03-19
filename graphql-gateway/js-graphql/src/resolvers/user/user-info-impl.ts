import { User } from '../../gql.types';

const userInfoResolver = ({ info }: User, _a: any, _c: any) => ({ gender: info?.gender });

module.exports = userInfoResolver;
