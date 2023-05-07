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

export type updateRequiredVar = {
  nickname: string;
};

export type UpdateRequiredInfoWithAttachmentMutationVariables = {
  nickname: string;
  image: string;
};

export type updateRequiredResult = {
  updateInfo: {
    info: {
      nickname: string;
    };
  };
};

export const updateRequiredQuery = gql`
  mutation MyMutation($nickname: String, $image: String) {
    updateInfo(input: { nickname: $nickname, image: $image }) {
      info {
        nickname
      }
    }
  }
`;

export type optionUpdateVariables = {
  bio: string;
  phone: string;
};

export type optionUpdateResult = {
  updateInfo: {
    info: {
      bio: string;
      phone: string;
    };
  };
};

export const optionUpdateQuery = gql`
  mutation MyMutation($bio: String, $phone: String) {
    updateInfo(input: { bio: $bio, phone: $phone }) {
      info {
        bio
        phone
      }
    }
  }
`;
