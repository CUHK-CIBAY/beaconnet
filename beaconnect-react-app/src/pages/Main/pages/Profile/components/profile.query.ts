import { gql } from '@apollo/client';

export type showProfileQueryResult = {
  me: {
    info: {
      bio: string;
      nickname: string;
      image: string;
    };
    username: string;
    bits: [
      {
        id: string;
      },
    ];
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
      }
    }
  }
`;

export type showUserProfileQueryVariables = {
  username?: string;
  email?: string;
};

export type showUserProfileQueryResult = {
  findUser: {
    info: {
      bio: string;
      nickname: string;
      image: string;
    };
    username: string;
    bits: [
      {
        id: string;
      },
    ];
  };
};

export const showUserProfileQueryUsername = gql`
  query showUserProfile($username: String!) {
    findUser(input: { username: $username }) {
      info {
        bio
        nickname
        image
      }
      username
      bits {
        id
      }
    }
  }
`;

export const showUserProfileQueryEmail = gql`
  query showUserProfile($email: String!) {
    findUser(input: { email: $email }) {
      info {
        bio
        nickname
        image
      }
      username
      bits {
        id
      }
    }
  }
`;
