import { gql, useMutation } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput2: RegisterInput!) {
    register(input: $registerInput2) {
      accessToken
      user {
        id
        email
        createdAt
      }
    }
  }
`;

export const useRegisterMutation = () => useMutation(REGISTER_MUTATION);
