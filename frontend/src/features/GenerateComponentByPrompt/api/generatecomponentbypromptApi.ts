import { gql } from "@apollo/client";

export const GENERATE_COMPONENT_MUTATION = gql`
  mutation GenerateComponentByPrompt($input: GenerateComponentInput!) {
    generateComponentByPrompt(input: $input) {
      meta
      prompt
      response {
        original
        code
      }
    }
  }
`;
