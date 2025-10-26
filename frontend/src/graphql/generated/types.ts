export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
