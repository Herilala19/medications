/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetUnreadNotificationCount {\n    unreadNotificationCount\n  }\n": typeof types.GetUnreadNotificationCountDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Signup($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n": typeof types.SignupDocument,
    "\n  mutation RefreshToken($token: JWT!) {\n    refreshToken(token: $token) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  query GetCurrentUser {\n    me {\n      id\n      email\n      firstname\n      lastname\n    }\n  }\n": typeof types.GetCurrentUserDocument,
    "\n  query GetDrugs(\n    $isActive: Boolean\n    $first: Int\n    $after: String\n    $orderBy: DrugOrderInput\n  ) {\n    drugs(\n      isActive: $isActive\n      first: $first\n      after: $after\n      orderBy: $orderBy\n    ) {\n      edges {\n        node {\n          id\n          name\n          description\n          dosage\n          unit\n          frequency\n          frequencyUnit\n          startDate\n          endDate\n          isActive\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n": typeof types.GetDrugsDocument,
    "\n  query GetDrug($id: String!) {\n    drug(id: $id) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetDrugDocument,
    "\n  mutation CreateDrug($input: CreateDrugInput!) {\n    createDrug(input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateDrugDocument,
    "\n  mutation UpdateDrug($id: String!, $input: UpdateDrugInput!) {\n    updateDrug(id: $id, input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateDrugDocument,
    "\n  mutation DeleteDrug($id: String!) {\n    deleteDrug(id: $id)\n  }\n": typeof types.DeleteDrugDocument,
    "\n  query GetUpcomingDrugs {\n    upcomingDrugs {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetUpcomingDrugsDocument,
    "\n  query GetNotifications($first: Int, $after: String, $unreadOnly: Boolean) {\n    notifications(first: $first, after: $after, unreadOnly: $unreadOnly) {\n      edges {\n        node {\n          id\n          type\n          title\n          message\n          scheduledFor\n          read\n          readAt\n          status\n          createdAt\n          drugSchedule {\n            id\n            time\n            dosage\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n    unreadNotificationCount\n  }\n": typeof types.GetNotificationsDocument,
    "\n  mutation MarkNotificationAsRead($id: String!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n      readAt\n    }\n  }\n": typeof types.MarkNotificationAsReadDocument,
    "\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead\n  }\n": typeof types.MarkAllNotificationsAsReadDocument,
    "\n  subscription OnNotificationCreated {\n    notificationCreated {\n      id\n      type\n      title\n      message\n      scheduledFor\n      read\n      status\n      createdAt\n      drugSchedule {\n        id\n        time\n        dosage\n      }\n    }\n  }\n": typeof types.OnNotificationCreatedDocument,
};
const documents: Documents = {
    "\n  query GetUnreadNotificationCount {\n    unreadNotificationCount\n  }\n": types.GetUnreadNotificationCountDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Signup($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n": types.SignupDocument,
    "\n  mutation RefreshToken($token: JWT!) {\n    refreshToken(token: $token) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  query GetCurrentUser {\n    me {\n      id\n      email\n      firstname\n      lastname\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  query GetDrugs(\n    $isActive: Boolean\n    $first: Int\n    $after: String\n    $orderBy: DrugOrderInput\n  ) {\n    drugs(\n      isActive: $isActive\n      first: $first\n      after: $after\n      orderBy: $orderBy\n    ) {\n      edges {\n        node {\n          id\n          name\n          description\n          dosage\n          unit\n          frequency\n          frequencyUnit\n          startDate\n          endDate\n          isActive\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n": types.GetDrugsDocument,
    "\n  query GetDrug($id: String!) {\n    drug(id: $id) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetDrugDocument,
    "\n  mutation CreateDrug($input: CreateDrugInput!) {\n    createDrug(input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateDrugDocument,
    "\n  mutation UpdateDrug($id: String!, $input: UpdateDrugInput!) {\n    updateDrug(id: $id, input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateDrugDocument,
    "\n  mutation DeleteDrug($id: String!) {\n    deleteDrug(id: $id)\n  }\n": types.DeleteDrugDocument,
    "\n  query GetUpcomingDrugs {\n    upcomingDrugs {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUpcomingDrugsDocument,
    "\n  query GetNotifications($first: Int, $after: String, $unreadOnly: Boolean) {\n    notifications(first: $first, after: $after, unreadOnly: $unreadOnly) {\n      edges {\n        node {\n          id\n          type\n          title\n          message\n          scheduledFor\n          read\n          readAt\n          status\n          createdAt\n          drugSchedule {\n            id\n            time\n            dosage\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n    unreadNotificationCount\n  }\n": types.GetNotificationsDocument,
    "\n  mutation MarkNotificationAsRead($id: String!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n      readAt\n    }\n  }\n": types.MarkNotificationAsReadDocument,
    "\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead\n  }\n": types.MarkAllNotificationsAsReadDocument,
    "\n  subscription OnNotificationCreated {\n    notificationCreated {\n      id\n      type\n      title\n      message\n      scheduledFor\n      read\n      status\n      createdAt\n      drugSchedule {\n        id\n        time\n        dosage\n      }\n    }\n  }\n": types.OnNotificationCreatedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUnreadNotificationCount {\n    unreadNotificationCount\n  }\n"): (typeof documents)["\n  query GetUnreadNotificationCount {\n    unreadNotificationCount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signup($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Signup($data: SignupInput!) {\n    signup(data: $data) {\n      accessToken\n      refreshToken\n      user {\n        id\n        email\n        firstname\n        lastname\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken($token: JWT!) {\n    refreshToken(token: $token) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($token: JWT!) {\n    refreshToken(token: $token) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrentUser {\n    me {\n      id\n      email\n      firstname\n      lastname\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    me {\n      id\n      email\n      firstname\n      lastname\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDrugs(\n    $isActive: Boolean\n    $first: Int\n    $after: String\n    $orderBy: DrugOrderInput\n  ) {\n    drugs(\n      isActive: $isActive\n      first: $first\n      after: $after\n      orderBy: $orderBy\n    ) {\n      edges {\n        node {\n          id\n          name\n          description\n          dosage\n          unit\n          frequency\n          frequencyUnit\n          startDate\n          endDate\n          isActive\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetDrugs(\n    $isActive: Boolean\n    $first: Int\n    $after: String\n    $orderBy: DrugOrderInput\n  ) {\n    drugs(\n      isActive: $isActive\n      first: $first\n      after: $after\n      orderBy: $orderBy\n    ) {\n      edges {\n        node {\n          id\n          name\n          description\n          dosage\n          unit\n          frequency\n          frequencyUnit\n          startDate\n          endDate\n          isActive\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetDrug($id: String!) {\n    drug(id: $id) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetDrug($id: String!) {\n    drug(id: $id) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateDrug($input: CreateDrugInput!) {\n    createDrug(input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDrug($input: CreateDrugInput!) {\n    createDrug(input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateDrug($id: String!, $input: UpdateDrugInput!) {\n    updateDrug(id: $id, input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDrug($id: String!, $input: UpdateDrugInput!) {\n    updateDrug(id: $id, input: $input) {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteDrug($id: String!) {\n    deleteDrug(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteDrug($id: String!) {\n    deleteDrug(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUpcomingDrugs {\n    upcomingDrugs {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUpcomingDrugs {\n    upcomingDrugs {\n      id\n      name\n      description\n      dosage\n      unit\n      frequency\n      frequencyUnit\n      startDate\n      endDate\n      isActive\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetNotifications($first: Int, $after: String, $unreadOnly: Boolean) {\n    notifications(first: $first, after: $after, unreadOnly: $unreadOnly) {\n      edges {\n        node {\n          id\n          type\n          title\n          message\n          scheduledFor\n          read\n          readAt\n          status\n          createdAt\n          drugSchedule {\n            id\n            time\n            dosage\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n    unreadNotificationCount\n  }\n"): (typeof documents)["\n  query GetNotifications($first: Int, $after: String, $unreadOnly: Boolean) {\n    notifications(first: $first, after: $after, unreadOnly: $unreadOnly) {\n      edges {\n        node {\n          id\n          type\n          title\n          message\n          scheduledFor\n          read\n          readAt\n          status\n          createdAt\n          drugSchedule {\n            id\n            time\n            dosage\n          }\n        }\n        cursor\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n    unreadNotificationCount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MarkNotificationAsRead($id: String!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n      readAt\n    }\n  }\n"): (typeof documents)["\n  mutation MarkNotificationAsRead($id: String!) {\n    markNotificationAsRead(id: $id) {\n      id\n      read\n      readAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead\n  }\n"): (typeof documents)["\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnNotificationCreated {\n    notificationCreated {\n      id\n      type\n      title\n      message\n      scheduledFor\n      read\n      status\n      createdAt\n      drugSchedule {\n        id\n        time\n        dosage\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription OnNotificationCreated {\n    notificationCreated {\n      id\n      type\n      title\n      message\n      scheduledFor\n      read\n      status\n      createdAt\n      drugSchedule {\n        id\n        time\n        dosage\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;