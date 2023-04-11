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

export type getBitsQueryVariables = {
  limit: number;
  offset: number;
};

export type getBitsQueryResult = {
  bits: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
    };
  }[];
};

export const getBitsQuery = gql`
  query GetBits($limit: Int!, $offset: Int!) {
    bits(limit: $limit, offset: $offset) {
      id
      content
      createdAt
      user {
        id
        name
      }
    }
  }
`;
