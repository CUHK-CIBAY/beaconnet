import { gql } from '@apollo/client';

export async function getPosts(following: boolean): Promise<Post[]> {
    const result = await client.query<showBitsQueryResult>({
      query: showBitsQuery,
      variables: { following },
    });

    return result.data.bits.map(post => ({
      id: post.id,
      username: post.author.username,
      content: post.content,
      createdAt: new Date(post.createAt),
      totalLike: post.totalLike,
      author: {
        id: post.author.id,
        username: post.author.username,
      },
    }));
  }

  interface Post {
    id: string;
    username: string;
    content: string;
    createdAt: string;
    totalLike: number;
    author: {
      id: string;
      username: string;
    };
  }