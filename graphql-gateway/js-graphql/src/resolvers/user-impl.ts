import { Gender, User, UserInfo, Bit } from '../gql.types';

// Mock data
const users: User[] = [
    {
        id: '1', 
        email: 'test@test.com', 
        nickname: null,
        followingIds: [],
        username: 'test',
        password: '123456',
        info: {gender: Gender.HIDDEN},
        bitsId: null,
    },
    {
        id: '2',
        email: 'test2@test.com',
        nickname: 'Alex',
        followingIds: ['1'],
        username: 'TEST2',
        password: '123456',
        info: {gender: Gender.MALE},
        bitsId: ['1','2'],
    }
]

const bits: Bit[] = [
    {
        id: '1',
        content: 'hello world',
        createAt: '2023-03-10T19:38:56.179Z',
        totalLike: 0,
        likeGiversId: []
    },
    {
        id: '2',
        content: 'So sleepy',
        createAt: '2023-03-10T19:40:56.179Z',
        totalLike: 1,
        likeGiversId: ['1']
    }
]


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
        gender: (p: UserInfo) => {
            return p.gender;
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
