import { User, Bit, Gender } from './gql.types';

export const users: User[] = [
  {
    id: '1',
    email: 'test@test.com',
    nickname: null,
    followingIds: [],
    username: 'test',
    password: '123456',
    info: { gender: Gender.HIDDEN },
    bitsId: null,
  },
  {
    id: '2',
    email: 'test2@test.com',
    nickname: 'Alex',
    followingIds: ['1'],
    username: 'TEST2',
    password: '123456',
    info: { gender: Gender.MALE },
    bitsId: ['1', '2'],
  },
];

export const bits: Bit[] = [
  {
    id: '1',
    content: 'hello world',
    createAt: '2023-03-10T19:38:56.179Z',
    totalLike: 0,
    likeGiversId: [],
  },
  {
    id: '2',
    content: 'So sleepy',
    createAt: '2023-03-10T19:40:56.179Z',
    totalLike: 1,
    likeGiversId: ['1'],
  },
];
