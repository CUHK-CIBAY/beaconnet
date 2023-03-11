import { Gender, User, UserInfo } from './user.type'
import { Bit } from './bit.type';

// Mock data
const users: User[] = [
    {
        id: 1, 
        email: 'test@test.com', 
        nickname: null,
        followingIds: [],
        username: 'test',
        password: '123456',
        info: {gender: Gender.HIDDEN},
        bitsId: [],
    },
    {
        id: 2,
        email: 'test2@test.com',
        nickname: 'Alex',
        followingIds: [1],
        username: 'TEST2',
        password: '123456',
        info: {gender: Gender.MALE},
        bitsId: [1,2],
    }
]

const bits: Bit[] = [
    {
        id: 1,
        content: 'hello world',
        createAt: '2023-03-10T19:38:56.179Z',
        totalLike: 0,
        likeGiversId: []
    },
    {
        id: 2,
        content: 'So sleepy',
        createAt: '2023-03-10T19:40:56.179Z',
        totalLike: 1,
        likeGiversId: [1]
    }
]


// helper
const filterUsersByUserIds = (userIds: number[]) => 
    users.filter(user => userIds.includes(user.id));

const findUserByUserId = (userId: number) => users.find(user =>
    user.id === Number(userId));
const findBitsByBitIds = (bitIds: number[]) =>
    bits.filter(bit => bitIds.includes(bit.id));

const resolvers = {
    Query: {
        users: () => users,
         user: (_r: any, { userId }: { userId: number }, _c: any) => findUserByUserId(userId)
    },
    User: {
        following: (p: User, _a: any, _c: any) => filterUsersByUserIds(p.followingIds || []),
        bits: (p: User) => findBitsByBitIds(p.bitsId || []) 
    },
    UserInfo: {
        gender: (p: UserInfo) => {
            switch (p.gender) {
                case Gender.MALE:
                    return 'MALE';
                case Gender.FEMALE:
                    return 'FEMALE';
                case Gender.OTHER:
                    return 'OTHER';
                case Gender.HIDDEN:
                    return 'HIDDEN';
            }
        }
    }
            
};

module.exports = resolvers;
