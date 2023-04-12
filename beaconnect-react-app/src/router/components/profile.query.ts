import { gql } from '@apollo/client';

const getUserProfileQuery = gql`
  query getUserProfile {
    me {
      nickname
    }
  }
`;

export default getUserProfileQuery;
