import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResultOutput = {
  __typename?: 'AuthResultOutput';
  accessToken: Scalars['String']['output'];
  user: UserOutput;
};

export type ComponentOutput = {
  __typename?: 'ComponentOutput';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  versions: Array<VersionOutput>;
};

export type CreateComponentInput = {
  name: Scalars['String']['input'];
};

export type CreateFigmaInput = {
  componentId?: InputMaybe<Scalars['String']['input']>;
  fileId: Scalars['String']['input'];
  meta: Scalars['String']['input'];
  nodeId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreatePromptInput = {
  componentId?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['String']['input']>;
  styles: Array<Scalars['String']['input']>;
  technologies: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateTestInput = {
  code: Scalars['String']['input'];
  componentVersionId: Scalars['String']['input'];
  meta: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateVersionInput = {
  code: Scalars['String']['input'];
  componentId: Scalars['String']['input'];
  meta: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type FigmaOutput = {
  __typename?: 'FigmaOutput';
  componentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fileId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meta: Scalars['String']['output'];
  nodeId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type GenerateComponentInput = {
  componentId?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['String']['input']>;
  styles: Array<Scalars['String']['input']>;
  technologies: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type GenerateFigmaInput = {
  extra?: InputMaybe<Scalars['String']['input']>;
  fileId: Scalars['String']['input'];
  nodeId?: InputMaybe<Scalars['String']['input']>;
  styles?: InputMaybe<Array<Scalars['String']['input']>>;
  technologies?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GenerateResultOutput = {
  __typename?: 'GenerateResultOutput';
  meta?: Maybe<Scalars['String']['output']>;
  prompt: Scalars['String']['output'];
  response: PromptOutputResponse;
};

export type GenerateTestsInput = {
  componentVersionId: Scalars['String']['input'];
  extra?: InputMaybe<Scalars['String']['input']>;
  styles?: InputMaybe<Array<Scalars['String']['input']>>;
  technologies?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComponent: ComponentOutput;
  createFigma: FigmaOutput;
  createPrompt: PromptOutput;
  createTest: TestOutput;
  createVersion: VersionOutput;
  deleteFigma: Scalars['String']['output'];
  deleteTest: Scalars['String']['output'];
  generateComponentByFigma: GenerateResultOutput;
  generateComponentByPrompt: GenerateResultOutput;
  generateTestsForComponent: GenerateResultOutput;
  login: AuthResultOutput;
  register: AuthResultOutput;
  updateFigma: FigmaOutput;
  updateTest: TestOutput;
};


export type MutationCreateComponentArgs = {
  input: CreateComponentInput;
};


export type MutationCreateFigmaArgs = {
  input: CreateFigmaInput;
};


export type MutationCreatePromptArgs = {
  input: CreatePromptInput;
};


export type MutationCreateTestArgs = {
  input: CreateTestInput;
};


export type MutationCreateVersionArgs = {
  input: CreateVersionInput;
};


export type MutationDeleteFigmaArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTestArgs = {
  id: Scalars['String']['input'];
};


export type MutationGenerateComponentByFigmaArgs = {
  input: GenerateFigmaInput;
};


export type MutationGenerateComponentByPromptArgs = {
  input: GenerateComponentInput;
};


export type MutationGenerateTestsForComponentArgs = {
  input: GenerateTestsInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateFigmaArgs = {
  input: UpdateFigmaInput;
};


export type MutationUpdateTestArgs = {
  input: UpdateTestInput;
};

export type PromptOutput = {
  __typename?: 'PromptOutput';
  componentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  meta: Scalars['String']['output'];
  prompt: Scalars['String']['output'];
  response: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type PromptOutputResponse = {
  __typename?: 'PromptOutputResponse';
  code: Scalars['String']['output'];
  original: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  component?: Maybe<ComponentOutput>;
  figma?: Maybe<FigmaOutput>;
  me: UserOutput;
  myComponents: Array<ComponentOutput>;
  myFigmaFiles: Array<FigmaOutput>;
  myPrompts: Array<PromptOutput>;
  prompt?: Maybe<PromptOutput>;
  test?: Maybe<TestOutput>;
  tests: Array<TestOutput>;
  version?: Maybe<VersionOutput>;
  versions: Array<VersionOutput>;
};


export type QueryComponentArgs = {
  id: Scalars['String']['input'];
};


export type QueryFigmaArgs = {
  id: Scalars['String']['input'];
};


export type QueryPromptArgs = {
  id: Scalars['String']['input'];
};


export type QueryTestArgs = {
  id: Scalars['String']['input'];
};


export type QueryTestsArgs = {
  componentVersionId: Scalars['String']['input'];
};


export type QueryVersionArgs = {
  id: Scalars['String']['input'];
};


export type QueryVersionsArgs = {
  componentId: Scalars['String']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type TestOutput = {
  __typename?: 'TestOutput';
  code: Scalars['String']['output'];
  componentVersionId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  meta: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UpdateFigmaInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  meta?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTestInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  meta?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  components: Array<ComponentOutput>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type VersionOutput = {
  __typename?: 'VersionOutput';
  code: Scalars['String']['output'];
  componentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  meta: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tests: Array<TestOutput>;
};

export type GenerateComponentByPromptMutationVariables = Exact<{
  input: GenerateComponentInput;
}>;


export type GenerateComponentByPromptMutation = { __typename?: 'Mutation', generateComponentByPrompt: { __typename?: 'GenerateResultOutput', meta?: string | null, prompt: string, response: { __typename?: 'PromptOutputResponse', original: string, code: string } } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResultOutput', accessToken: string, user: { __typename?: 'UserOutput', id: string, email: string, createdAt: any } } };

export type RegisterMutationVariables = Exact<{
  registerInput2: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResultOutput', accessToken: string, user: { __typename?: 'UserOutput', id: string, email: string, createdAt: any } } };


export const GenerateComponentByPromptDocument = gql`
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
export type GenerateComponentByPromptMutationFn = Apollo.MutationFunction<GenerateComponentByPromptMutation, GenerateComponentByPromptMutationVariables>;

/**
 * __useGenerateComponentByPromptMutation__
 *
 * To run a mutation, you first call `useGenerateComponentByPromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateComponentByPromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateComponentByPromptMutation, { data, loading, error }] = useGenerateComponentByPromptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateComponentByPromptMutation(baseOptions?: Apollo.MutationHookOptions<GenerateComponentByPromptMutation, GenerateComponentByPromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateComponentByPromptMutation, GenerateComponentByPromptMutationVariables>(GenerateComponentByPromptDocument, options);
      }
export type GenerateComponentByPromptMutationHookResult = ReturnType<typeof useGenerateComponentByPromptMutation>;
export type GenerateComponentByPromptMutationResult = Apollo.MutationResult<GenerateComponentByPromptMutation>;
export type GenerateComponentByPromptMutationOptions = Apollo.BaseMutationOptions<GenerateComponentByPromptMutation, GenerateComponentByPromptMutationVariables>;
export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
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
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput2: // value for 'registerInput2'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;