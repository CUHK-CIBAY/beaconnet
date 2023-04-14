import { userInfoResolver, updateUserInfo } from './user-info-impl';
import { userBitsResolver, meResolver } from './user-impl';

export const Query = {
  findUser: require('./user-search'),
  users: require('./user-show'),
  me: meResolver,
};

export const User = {
  // following: (p: UserType) => filterUsersByUserIds(p.followingIds ?? []),
  info: userInfoResolver,
  bits: userBitsResolver,
};

export const Mutation = {
  updateInfo: updateUserInfo,
  register: require('./user-register'),
  login: require('./user-login'),
  deleteUser: require('./user-delete'),
  followUser: require('./user-follow'),
};
