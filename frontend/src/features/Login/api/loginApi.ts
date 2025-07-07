import { gql, useMutation } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        createdAt
      }
      accessToken
    }
  }
`;

export const useLoginMutation = () => useMutation(LOGIN_MUTATION);
