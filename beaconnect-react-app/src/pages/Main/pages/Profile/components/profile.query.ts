import { gql } from '@apollo/client';

export type showProfileQueryResult = {
  me: {
    info: {
      bio: string;
      nickname: string;
      image: string;
    };
    username: string;
    bits: {
      id: string;
      content: string;
      createAt: string;
      totalLike: number;
      image: string;
      author: {
        id: string;
        username: string;
        info: {
          image: string;
          nickname: string;
        };
      };
      reBit: {
        content: string;
        createAt: string;
        author: {
          username: string;
          info: {
            image: string;
            nickname: string;
          };
        };
      };
      comment: {
        content: string;
        createAt: string;
        owner: {
          info: {
            nickname: string;
          };
          username: string;
        };
      };
    };
  };
};

export const showProfileQuery = gql`
  query showProfile {
    me {
      info {
        bio
        nickname
        image
      }
      username
      bits {
        id
        content
        createAt
        totalLike
        image
        author {
          id
          username
          info {
            image
            nickname
          }
        }
      }
    }
  }
`;
