import { gql } from '@apollo/client';

export type LoginMutationVariables = {
  email: string;
  password: string;
};

export type LoginMutationResult = {
  login: {
    token: string;
  };
};

export type RegisterMutationVariables = {
  email: string;
  password: string;
  username: string;
};

export type RegisterMutationResult = {
  register: {
    id: string;
  };
};

export const loginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const registerQuery = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(input: { email: $email, username: $username, password: $password }) {
      id
    }
  }
`;
