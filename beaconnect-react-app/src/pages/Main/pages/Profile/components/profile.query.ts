import { gql } from '@apollo/client';

export type showProfileQueryVariables = {
  following: Boolean;
};

export type showProfileQueryResult = {
  bits: [
    {
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
    },
  ];
};

export const showProfileQuery = gql`
  query GetBits($following: Boolean) {
    showBits(following: $following) {
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
      reBit {
        content
        createAt
        author {
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
