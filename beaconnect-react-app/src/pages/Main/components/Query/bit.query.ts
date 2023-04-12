import { gql } from '@apollo/client';

export type postBitMutationVariables = {
  content: string;
};

export type postBitMutationResult = {
  postBit: {
    id: string;
  };
};

export const postBitQuery = gql`
  mutation PostBit($content: String!) {
    postBit(content: $content) {
      id
    }
  }
`;

export type showBitsQueryVariables = {
  following: Boolean
};

export type showBitsQueryResult = {
  bits: [{
    id: string;
    content: string;
    createAt: string;
    author: {
      id: string;
      username: string;
    };
  }];
};

export const showBitsQuery = gql`
  query GetBits($following: Boolean) {
    showBits(following: $following) {
      id
      content
      createAt
      totalLike
      author {
        id
        username
      }
    }
  }
`;
