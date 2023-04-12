import { gql } from '@apollo/client';

export const getUserProfileQuery = gql`
  query getUserProfile {
    me {
      info {
        nickname
      }
    }
  }
`;

export type UpdateRequiredInfoMutationVariables = {
  nickname: string;
};

export type UpdateRequiredInfoMutationResult = {
  updateInfo: {
    info: {
      nickname: string;
    };
  };
};

export const updateRequiredInfoQuery = gql`
  mutation MyMutation($nickname: String) {
    updateInfo(input: { nickname: $nickname }) {
      info {
        nickname
      }
    }
  }
`;

export type UpdateOptionalInfoMutationVariables = {
  bio: string;
  phone: string;
};

export type UpdateOptionalInfoMutationResult = {
  updateInfo: {
    info: {
      bio: string;
      phone: string;
    };
  };
};

export const updateOptionalInfoQuery = gql`
  mutation MyMutation($nickname: String) {
    updateInfo(input: { nickname: $nickname }) {
      info {
        nickname
      }
    }
  }
`;
