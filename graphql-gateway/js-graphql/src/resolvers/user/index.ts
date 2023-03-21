// import { users, bits } from '../../mock-data';
// import { User as UserType } from '../../gql.types';

// const filterUsersByUserIds = (userIds: string[]) => users.filter((user) => userIds.includes(user.id));

// const findBitsByBitIds = (bitIds: string[]) => bits.filter((bit) => bitIds.includes(bit.id));

export const Query = {
  findUser: require('./user-search'),
  // users: () => users,
};

export const User = {
 // following: (p: UserType) => filterUsersByUserIds(p.followingIds ?? []),
 // bits: (p: UserType) => findBitsByBitIds(p.bitsId ?? []),
  info: require('./user-info-impl'),
};
