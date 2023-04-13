import { gql } from '@apollo/client';

export type searchUserVariables = {
  username: string;
};

export type searchUserResult = {
  searchUser: {
    username: string;
  };
};

export const searchUserQuery = gql`
  query searchUserQuery($username: String!) {
    searchUser(username: $username) {
      username
    }
  }
`;
