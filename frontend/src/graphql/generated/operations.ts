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
  JWT: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CreateDrugInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dosage: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  frequency: Scalars['Int']['input'];
  frequencyUnit: FrequencyUnit;
  name: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  unit: Scalars['String']['input'];
};

export type CreateDrugScheduleInput = {
  dosage: Scalars['String']['input'];
  drugId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  time: Scalars['String']['input'];
};

export type CreateNotificationInput = {
  drugScheduleId?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  scheduledFor: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: NotificationType;
};

export type Drug = {
  __typename?: 'Drug';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dosage: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  frequency: Scalars['Int']['output'];
  frequencyUnit: FrequencyUnit;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  schedules: Array<DrugSchedule>;
  startDate: Scalars['DateTime']['output'];
  unit: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type DrugConnection = {
  __typename?: 'DrugConnection';
  edges?: Maybe<Array<DrugEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DrugEdge = {
  __typename?: 'DrugEdge';
  cursor: Scalars['String']['output'];
  node: Drug;
};

/** Fields available for drug ordering */
export enum DrugOrderField {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME',
  StartDate = 'START_DATE',
  UpdatedAt = 'UPDATED_AT'
}

export type DrugOrderInput = {
  direction: OrderDirection;
  field: DrugOrderField;
};

export type DrugSchedule = {
  __typename?: 'DrugSchedule';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  dosage: Scalars['String']['output'];
  drug: Drug;
  drugId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  taken: Scalars['Boolean']['output'];
  takenAt?: Maybe<Scalars['DateTime']['output']>;
  time: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type DrugScheduleConnection = {
  __typename?: 'DrugScheduleConnection';
  edges?: Maybe<Array<DrugScheduleEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DrugScheduleEdge = {
  __typename?: 'DrugScheduleEdge';
  cursor: Scalars['String']['output'];
  node: DrugSchedule;
};

/** Frequency unit for drug administration */
export enum FrequencyUnit {
  Days = 'DAYS',
  Hours = 'HOURS',
  Weeks = 'WEEKS'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createDrug: Drug;
  createDrugSchedule: DrugSchedule;
  createNotification: Notification;
  deleteDrug: Scalars['Boolean']['output'];
  deleteDrugSchedule: Scalars['Boolean']['output'];
  login: Auth;
  markAllNotificationsAsRead: Scalars['Int']['output'];
  markDrugTaken: DrugSchedule;
  markNotificationAsRead: Notification;
  refreshToken: Token;
  signup: Auth;
  updateDrug: Drug;
  updateDrugSchedule: DrugSchedule;
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateDrugArgs = {
  input: CreateDrugInput;
};


export type MutationCreateDrugScheduleArgs = {
  input: CreateDrugScheduleInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationDeleteDrugArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteDrugScheduleArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkDrugTakenArgs = {
  scheduleId: Scalars['String']['input'];
  takenAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT']['input'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateDrugArgs = {
  id: Scalars['String']['input'];
  input: UpdateDrugInput;
};


export type MutationUpdateDrugScheduleArgs = {
  id: Scalars['String']['input'];
  input: UpdateDrugScheduleInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  drugSchedule?: Maybe<DrugSchedule>;
  drugScheduleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  scheduledFor: Scalars['DateTime']['output'];
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status: NotificationStatus;
  title: Scalars['String']['output'];
  type: NotificationType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges?: Maybe<Array<NotificationEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
};

/** Status of notification */
export enum NotificationStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Sent = 'SENT'
}

/** Type of notification */
export enum NotificationType {
  DrugMissed = 'DRUG_MISSED',
  DrugReminder = 'DRUG_REMINDER',
  DrugUpcoming = 'DRUG_UPCOMING',
  System = 'SYSTEM'
}

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  drug?: Maybe<Drug>;
  drugSchedules: DrugScheduleConnection;
  drugs: DrugConnection;
  hello: Scalars['String']['output'];
  helloWorld: Scalars['String']['output'];
  me: User;
  notifications: NotificationConnection;
  unreadNotificationCount: Scalars['Int']['output'];
  upcomingDrugs: Array<Drug>;
};


export type QueryDrugArgs = {
  id: Scalars['String']['input'];
};


export type QueryDrugSchedulesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  drugId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDrugsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DrugOrderInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  unreadOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupInput = {
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  notificationCreated: Notification;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type UpdateDrugInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dosage?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Scalars['Int']['input']>;
  frequencyUnit?: InputMaybe<FrequencyUnit>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDrugScheduleInput = {
  dosage?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  taken?: InputMaybe<Scalars['Boolean']['input']>;
  takenAt?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  drugs?: Maybe<Array<Drug>>;
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  role: Role;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type GetUnreadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationCountQuery = { __typename?: 'Query', unreadNotificationCount: number };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: any, refreshToken: any, user: { __typename?: 'User', id: string, email: string, firstname?: string | null, lastname?: string | null } } };

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', accessToken: any, refreshToken: any, user: { __typename?: 'User', id: string, email: string, firstname?: string | null, lastname?: string | null } } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['JWT']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Token', accessToken: any, refreshToken: any } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstname?: string | null, lastname?: string | null } };

export type GetDrugsQueryVariables = Exact<{
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<DrugOrderInput>;
}>;


export type GetDrugsQuery = { __typename?: 'Query', drugs: { __typename?: 'DrugConnection', totalCount: number, edges?: Array<{ __typename?: 'DrugEdge', node: { __typename?: 'Drug', id: string, name: string, description?: string | null, dosage: string, unit: string, frequency: number, frequencyUnit: FrequencyUnit, startDate: any, endDate?: any | null, isActive: boolean, userId: string, createdAt: any, updatedAt: any } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type GetDrugQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetDrugQuery = { __typename?: 'Query', drug?: { __typename?: 'Drug', id: string, name: string, description?: string | null, dosage: string, unit: string, frequency: number, frequencyUnit: FrequencyUnit, startDate: any, endDate?: any | null, isActive: boolean, userId: string, createdAt: any, updatedAt: any } | null };

export type CreateDrugMutationVariables = Exact<{
  input: CreateDrugInput;
}>;


export type CreateDrugMutation = { __typename?: 'Mutation', createDrug: { __typename?: 'Drug', id: string, name: string, description?: string | null, dosage: string, unit: string, frequency: number, frequencyUnit: FrequencyUnit, startDate: any, endDate?: any | null, isActive: boolean, userId: string, createdAt: any, updatedAt: any } };

export type UpdateDrugMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateDrugInput;
}>;


export type UpdateDrugMutation = { __typename?: 'Mutation', updateDrug: { __typename?: 'Drug', id: string, name: string, description?: string | null, dosage: string, unit: string, frequency: number, frequencyUnit: FrequencyUnit, startDate: any, endDate?: any | null, isActive: boolean, userId: string, createdAt: any, updatedAt: any } };

export type DeleteDrugMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteDrugMutation = { __typename?: 'Mutation', deleteDrug: boolean };

export type GetUpcomingDrugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUpcomingDrugsQuery = { __typename?: 'Query', upcomingDrugs: Array<{ __typename?: 'Drug', id: string, name: string, description?: string | null, dosage: string, unit: string, frequency: number, frequencyUnit: FrequencyUnit, startDate: any, endDate?: any | null, isActive: boolean, userId: string, createdAt: any, updatedAt: any }> };

export type GetNotificationsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  unreadOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', unreadNotificationCount: number, notifications: { __typename?: 'NotificationConnection', edges?: Array<{ __typename?: 'NotificationEdge', cursor: string, node: { __typename?: 'Notification', id: string, type: NotificationType, title: string, message: string, scheduledFor: any, read: boolean, readAt?: any | null, status: NotificationStatus, createdAt: any, drugSchedule?: { __typename?: 'DrugSchedule', id: string, time: string, dosage: string } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'Notification', id: string, read: boolean, readAt?: any | null } };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: number };

export type OnNotificationCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnNotificationCreatedSubscription = { __typename?: 'Subscription', notificationCreated: { __typename?: 'Notification', id: string, type: NotificationType, title: string, message: string, scheduledFor: any, read: boolean, status: NotificationStatus, createdAt: any, drugSchedule?: { __typename?: 'DrugSchedule', id: string, time: string, dosage: string } | null } };


export const GetUnreadNotificationCountDocument = gql`
    query GetUnreadNotificationCount {
  unreadNotificationCount
}
    `;

/**
 * __useGetUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadNotificationCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
      }
export function useGetUnreadNotificationCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
        }
export function useGetUnreadNotificationCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
        }
export type GetUnreadNotificationCountQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountQuery>;
export type GetUnreadNotificationCountLazyQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountLazyQuery>;
export type GetUnreadNotificationCountSuspenseQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountSuspenseQuery>;
export type GetUnreadNotificationCountQueryResult = Apollo.QueryResult<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    accessToken
    refreshToken
    user {
      id
      email
      firstname
      lastname
    }
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
 *      data: // value for 'data'
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
export const SignupDocument = gql`
    mutation Signup($data: SignupInput!) {
  signup(data: $data) {
    accessToken
    refreshToken
    user {
      id
      email
      firstname
      lastname
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($token: JWT!) {
  refreshToken(token: $token) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    id
    email
    firstname
    lastname
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDrugsDocument = gql`
    query GetDrugs($isActive: Boolean, $first: Int, $after: String, $orderBy: DrugOrderInput) {
  drugs(isActive: $isActive, first: $first, after: $after, orderBy: $orderBy) {
    edges {
      node {
        id
        name
        description
        dosage
        unit
        frequency
        frequencyUnit
        startDate
        endDate
        isActive
        userId
        createdAt
        updatedAt
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `;

/**
 * __useGetDrugsQuery__
 *
 * To run a query within a React component, call `useGetDrugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDrugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDrugsQuery({
 *   variables: {
 *      isActive: // value for 'isActive'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetDrugsQuery(baseOptions?: Apollo.QueryHookOptions<GetDrugsQuery, GetDrugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDrugsQuery, GetDrugsQueryVariables>(GetDrugsDocument, options);
      }
export function useGetDrugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDrugsQuery, GetDrugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDrugsQuery, GetDrugsQueryVariables>(GetDrugsDocument, options);
        }
export function useGetDrugsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDrugsQuery, GetDrugsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDrugsQuery, GetDrugsQueryVariables>(GetDrugsDocument, options);
        }
export type GetDrugsQueryHookResult = ReturnType<typeof useGetDrugsQuery>;
export type GetDrugsLazyQueryHookResult = ReturnType<typeof useGetDrugsLazyQuery>;
export type GetDrugsSuspenseQueryHookResult = ReturnType<typeof useGetDrugsSuspenseQuery>;
export type GetDrugsQueryResult = Apollo.QueryResult<GetDrugsQuery, GetDrugsQueryVariables>;
export const GetDrugDocument = gql`
    query GetDrug($id: String!) {
  drug(id: $id) {
    id
    name
    description
    dosage
    unit
    frequency
    frequencyUnit
    startDate
    endDate
    isActive
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDrugQuery__
 *
 * To run a query within a React component, call `useGetDrugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDrugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDrugQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDrugQuery(baseOptions: Apollo.QueryHookOptions<GetDrugQuery, GetDrugQueryVariables> & ({ variables: GetDrugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDrugQuery, GetDrugQueryVariables>(GetDrugDocument, options);
      }
export function useGetDrugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDrugQuery, GetDrugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDrugQuery, GetDrugQueryVariables>(GetDrugDocument, options);
        }
export function useGetDrugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDrugQuery, GetDrugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDrugQuery, GetDrugQueryVariables>(GetDrugDocument, options);
        }
export type GetDrugQueryHookResult = ReturnType<typeof useGetDrugQuery>;
export type GetDrugLazyQueryHookResult = ReturnType<typeof useGetDrugLazyQuery>;
export type GetDrugSuspenseQueryHookResult = ReturnType<typeof useGetDrugSuspenseQuery>;
export type GetDrugQueryResult = Apollo.QueryResult<GetDrugQuery, GetDrugQueryVariables>;
export const CreateDrugDocument = gql`
    mutation CreateDrug($input: CreateDrugInput!) {
  createDrug(input: $input) {
    id
    name
    description
    dosage
    unit
    frequency
    frequencyUnit
    startDate
    endDate
    isActive
    userId
    createdAt
    updatedAt
  }
}
    `;
export type CreateDrugMutationFn = Apollo.MutationFunction<CreateDrugMutation, CreateDrugMutationVariables>;

/**
 * __useCreateDrugMutation__
 *
 * To run a mutation, you first call `useCreateDrugMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDrugMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDrugMutation, { data, loading, error }] = useCreateDrugMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDrugMutation(baseOptions?: Apollo.MutationHookOptions<CreateDrugMutation, CreateDrugMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDrugMutation, CreateDrugMutationVariables>(CreateDrugDocument, options);
      }
export type CreateDrugMutationHookResult = ReturnType<typeof useCreateDrugMutation>;
export type CreateDrugMutationResult = Apollo.MutationResult<CreateDrugMutation>;
export type CreateDrugMutationOptions = Apollo.BaseMutationOptions<CreateDrugMutation, CreateDrugMutationVariables>;
export const UpdateDrugDocument = gql`
    mutation UpdateDrug($id: String!, $input: UpdateDrugInput!) {
  updateDrug(id: $id, input: $input) {
    id
    name
    description
    dosage
    unit
    frequency
    frequencyUnit
    startDate
    endDate
    isActive
    userId
    createdAt
    updatedAt
  }
}
    `;
export type UpdateDrugMutationFn = Apollo.MutationFunction<UpdateDrugMutation, UpdateDrugMutationVariables>;

/**
 * __useUpdateDrugMutation__
 *
 * To run a mutation, you first call `useUpdateDrugMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDrugMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDrugMutation, { data, loading, error }] = useUpdateDrugMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDrugMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDrugMutation, UpdateDrugMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDrugMutation, UpdateDrugMutationVariables>(UpdateDrugDocument, options);
      }
export type UpdateDrugMutationHookResult = ReturnType<typeof useUpdateDrugMutation>;
export type UpdateDrugMutationResult = Apollo.MutationResult<UpdateDrugMutation>;
export type UpdateDrugMutationOptions = Apollo.BaseMutationOptions<UpdateDrugMutation, UpdateDrugMutationVariables>;
export const DeleteDrugDocument = gql`
    mutation DeleteDrug($id: String!) {
  deleteDrug(id: $id)
}
    `;
export type DeleteDrugMutationFn = Apollo.MutationFunction<DeleteDrugMutation, DeleteDrugMutationVariables>;

/**
 * __useDeleteDrugMutation__
 *
 * To run a mutation, you first call `useDeleteDrugMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDrugMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDrugMutation, { data, loading, error }] = useDeleteDrugMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDrugMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDrugMutation, DeleteDrugMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDrugMutation, DeleteDrugMutationVariables>(DeleteDrugDocument, options);
      }
export type DeleteDrugMutationHookResult = ReturnType<typeof useDeleteDrugMutation>;
export type DeleteDrugMutationResult = Apollo.MutationResult<DeleteDrugMutation>;
export type DeleteDrugMutationOptions = Apollo.BaseMutationOptions<DeleteDrugMutation, DeleteDrugMutationVariables>;
export const GetUpcomingDrugsDocument = gql`
    query GetUpcomingDrugs {
  upcomingDrugs {
    id
    name
    description
    dosage
    unit
    frequency
    frequencyUnit
    startDate
    endDate
    isActive
    userId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUpcomingDrugsQuery__
 *
 * To run a query within a React component, call `useGetUpcomingDrugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingDrugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingDrugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpcomingDrugsQuery(baseOptions?: Apollo.QueryHookOptions<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>(GetUpcomingDrugsDocument, options);
      }
export function useGetUpcomingDrugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>(GetUpcomingDrugsDocument, options);
        }
export function useGetUpcomingDrugsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>(GetUpcomingDrugsDocument, options);
        }
export type GetUpcomingDrugsQueryHookResult = ReturnType<typeof useGetUpcomingDrugsQuery>;
export type GetUpcomingDrugsLazyQueryHookResult = ReturnType<typeof useGetUpcomingDrugsLazyQuery>;
export type GetUpcomingDrugsSuspenseQueryHookResult = ReturnType<typeof useGetUpcomingDrugsSuspenseQuery>;
export type GetUpcomingDrugsQueryResult = Apollo.QueryResult<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($first: Int, $after: String, $unreadOnly: Boolean) {
  notifications(first: $first, after: $after, unreadOnly: $unreadOnly) {
    edges {
      node {
        id
        type
        title
        message
        scheduledFor
        read
        readAt
        status
        createdAt
        drugSchedule {
          id
          time
          dosage
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
  unreadNotificationCount
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      unreadOnly: // value for 'unreadOnly'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: String!) {
  markNotificationAsRead(id: $id) {
    id
    read
    readAt
  }
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = Apollo.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const OnNotificationCreatedDocument = gql`
    subscription OnNotificationCreated {
  notificationCreated {
    id
    type
    title
    message
    scheduledFor
    read
    status
    createdAt
    drugSchedule {
      id
      time
      dosage
    }
  }
}
    `;

/**
 * __useOnNotificationCreatedSubscription__
 *
 * To run a query within a React component, call `useOnNotificationCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNotificationCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNotificationCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNotificationCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnNotificationCreatedSubscription, OnNotificationCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNotificationCreatedSubscription, OnNotificationCreatedSubscriptionVariables>(OnNotificationCreatedDocument, options);
      }
export type OnNotificationCreatedSubscriptionHookResult = ReturnType<typeof useOnNotificationCreatedSubscription>;
export type OnNotificationCreatedSubscriptionResult = Apollo.SubscriptionResult<OnNotificationCreatedSubscription>;