import { User } from '../../gql.types';

const userInfoResolver = ({ info }: User) => ({ gender: info?.gender });

export default userInfoResolver;
