import { Bit } from "./bit.type";

// Mock data
export const bits: Bit[] = [
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

const resolvers = {
    Query: {
        bits: () => bits,
    }
}

module.exports = resolvers;
