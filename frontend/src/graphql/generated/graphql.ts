/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
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


export const GetUnreadNotificationCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnreadNotificationCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unreadNotificationCount"}}]}}]} as unknown as DocumentNode<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JWT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDrugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDrugs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DrugOrderInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drugs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"frequencyUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetDrugsQuery, GetDrugsQueryVariables>;
export const GetDrugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDrug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"frequencyUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetDrugQuery, GetDrugQueryVariables>;
export const CreateDrugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDrug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDrugInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDrug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"frequencyUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateDrugMutation, CreateDrugMutationVariables>;
export const UpdateDrugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDrug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDrugInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDrug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"frequencyUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateDrugMutation, UpdateDrugMutationVariables>;
export const DeleteDrugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDrug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDrug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteDrugMutation, DeleteDrugMutationVariables>;
export const GetUpcomingDrugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUpcomingDrugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upcomingDrugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"frequency"}},{"kind":"Field","name":{"kind":"Name","value":"frequencyUnit"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUpcomingDrugsQuery, GetUpcomingDrugsQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unreadOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"unreadOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unreadOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"drugSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unreadNotificationCount"}}]}}]} as unknown as DocumentNode<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const MarkNotificationAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]}}]} as unknown as DocumentNode<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkAllNotificationsAsRead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markAllNotificationsAsRead"}}]}}]} as unknown as DocumentNode<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const OnNotificationCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnNotificationCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"drugSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"dosage"}}]}}]}}]}}]} as unknown as DocumentNode<OnNotificationCreatedSubscription, OnNotificationCreatedSubscriptionVariables>;