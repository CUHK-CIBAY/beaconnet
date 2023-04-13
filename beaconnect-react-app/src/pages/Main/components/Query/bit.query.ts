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

export type likeBitMutationVariables = {
  id: string;
};

export type likeBitMutationResult = {
  likeBit: {
    totalLike: number;
    id: string;
  };
};

export const likeBitQuery = gql`
  mutation LikeBit($id: ID!) {
    likeBit(id: $id) {
      totalLike
      id
    }
  }
`;

export type postBitWithAttachmentMutationVariables = {
  image: string;
  content: string;
};

export type postBitWithAttachmentMutationResult = {
  postBit: {
    id: string;
  };
};

export const postBitWithAttachmentQuery = gql`
  mutation PostBit($content: String!, $image: String) {
    postBit(content: $content, image: $image) {
      id
    }
  }
`;

export type showBitsQueryVariables = {
  following: Boolean;
};

export type showBitsQueryResult = {
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
    },
  ];
};

export const showBitsQuery = gql`
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
    }
  }
`;
