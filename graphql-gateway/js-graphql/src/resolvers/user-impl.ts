import { User, UserInfo } from '../gql.types';
import { users, bits } from '../mock-data';

// helper
const filterUsersByUserIds = (userIds: string[]) => 
    users.filter(user => userIds.includes(user.id));

const findUserByUserId = (userId: string) => users.find(user =>
    user.id === userId);
const findBitsByBitIds = (bitIds: string[]) =>
    bits.filter(bit => bitIds.includes(bit.id));

const resolvers = {
    Query: {
        users: () => users,
         user: (_r: any, { userId }: { userId: string }, _c: any) => findUserByUserId(userId)
    },
    User: {
        following: (p: User, _a: any, _c: any) => filterUsersByUserIds(p.followingIds || []),
        bits: (p: User) => findBitsByBitIds(p.bitsId ?? []) 
    },
    UserInfo: {
        gender: (p: UserInfo) => p.gender,
    }
            
};

module.exports = resolvers;
