import { gql } from '@apollo/client';

export type searchUserVariables = {
  username: string;
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

export const searchUserQuery = gql`
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
