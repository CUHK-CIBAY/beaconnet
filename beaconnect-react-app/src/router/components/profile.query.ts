import { gql } from '@apollo/client';

export const getUserProfileQuery = gql`
  query getUserProfile {
    me {
      nickname
    }
  }
`;

export type RegisterMutationVariables = {
  input: {
    nickname: string;
  };
};

export type RegisterMutationResult = {
  register: {
    nickname: string;
  };
};

export const updateInfoQuery = gql`
  mutation UpdateInfo($input: UpdateInfoInput = {}) {
    updateInfo(input: $input) {
      nickname
    }
  }
`;
