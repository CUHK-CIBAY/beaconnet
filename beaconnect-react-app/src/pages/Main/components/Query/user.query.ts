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
        }
    }

}
`;
