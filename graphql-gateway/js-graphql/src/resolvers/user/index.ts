import { userInfoResolver, updateUserInfo } from './user-info-impl';

export const Query = {
  findUser: require('./user-search'),
  me: require('./user-impl'),
};

export const User = {
  // following: (p: UserType) => filterUsersByUserIds(p.followingIds ?? []),
  info: userInfoResolver,
};

export const Mutation = {
  updateInfo: updateUserInfo,
  register: require('./user-register'),
  login: require('./user-login'),
};
