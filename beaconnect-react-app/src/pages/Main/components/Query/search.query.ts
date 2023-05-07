import { gql } from '@apollo/client';

export type searchUserVariables = {
  username?: string;
  email?: string;
};

export type searchUserResult = {
  findUser: {
    id: string;
    username: string;
    info: {
      bio: string;
      image: string;
      nickname: string;
    };
  };
};

export const searchUserQueryUsername = gql`
  query searchUserQuery($username: String!) {
    findUser(input: { username: $username }) {
      id
      username
      info {
        bio
        image
        nickname
      }
    }
  }
`;

export const searchUserQueryEmail = gql`
  query searchUserQuery($email: String!) {
    findUser(input: { email: $email }) {
      id
      username
      info {
        bio
        image
        nickname
      }
    }
  }
`;

export const showUsersListQuery = gql`
  query {
    users {
      username
      id
      info {
        nickname
        bio
        image
      }
    }
    me {
      following {
        id
      }
    }
  }
`;
