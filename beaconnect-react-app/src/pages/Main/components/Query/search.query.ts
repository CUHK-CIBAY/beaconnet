import { gql } from '@apollo/client';

export type searchUserVariables = {
  username?: string;
  email?: string;
};

export type searchUserResult = {
  findUser: {
    id: string;
  };
};

export const searchUserQueryUsername = gql`
  query searchUserQuery($username: String!) {
    findUser(input: { username: $username }) {
      id
    }
  }
`;

export const searchUserQueryEmail = gql`
  query searchUserQuery($email: String!) {
    findUser(input: { email: $email }) {
      id
    }
  }
`;

export type showUsersListResult = {
  users: {
    id: string;
  }[];
};

export const showUsersListQuery = gql`
  query {
    users {
      id
    }
  }
`;

export type followUserMutationVariables = {
  id: string;
};

export type followUserMutationResult = {
  followUser: {
    id: string;
  };
};

export const followUserQuery = gql`
  mutation followUser($id: ID!) {
    followUser(id: $id) {
      id
    }
  }
`;

export type findUserVariables = {
  ID: string;
};

export type findUserResult = {
  findUser: {
    id: string;
    username: string;
    info: {
      bio: string;
      image: string;
      nickname: string;
    };
    followed?: boolean;
  };
  me?: {
    following: {
      id: string;
    }[];
  };
};

export const findUserQuery = gql`
  query searchUserQuery($ID: ID!) {
    findUser(input: { id: $ID }) {
      id
      username
      info {
        bio
        image
        nickname
      }
    }
    me {
      following {
        id
      }
    }
  }
`;
