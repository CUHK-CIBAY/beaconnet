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

export type reBitMutationVariables = {
  content: string;
  id: string;
};

export type reBitMutationResult = {
  reBit: {
    id: string;
  };
};

export const reBitQuery = gql`
  mutation ReBit($content: String!, $id: ID!) {
    reBit(content: $content, id: $id) {
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
      comment {
        content
        createAt
        owner {
          info {
            nickname
          }
          username
        }
      }
    }
  }
`;
