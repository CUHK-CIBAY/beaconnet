import { gql } from '@apollo/client';

export type showUsersListQueryResult = {
  users: [
    {
      username: string;
      id: string;
      info: {
        nickname: string;
      };
    },
  ];
};

export const showUsersListQuery = gql`
  query {
    users {
      username
      id
      info {
        nickname
        image
      }
    }
  }
`;

export type deleteUserMutationVariables = {
  id: string;
};

export type deleteUserMutationResult = {
  boolean: false;
};

export const deleteUserQuery = gql`
  mutation MyMutation($id: ID!) {
    deleteUser(id: $id)
  }
`;
