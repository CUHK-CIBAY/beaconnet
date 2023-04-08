import { gql } from '@apollo/client';

export const loginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        firstName
        lastName
      }
      token
    }
  }
`;

export const registerQuery = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
    }
  }
`;
