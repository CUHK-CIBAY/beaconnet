import { gql } from '@apollo/client';

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
