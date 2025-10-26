import { gql } from "@apollo/client";

export const GET_DRUGS_QUERY = gql`
  query GetDrugs(
    $isActive: Boolean
    $first: Int
    $after: String
    $orderBy: DrugOrderInput
  ) {
    drugs(
      isActive: $isActive
      first: $first
      after: $after
      orderBy: $orderBy
    ) {
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

export const GET_DRUG_QUERY = gql`
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

export const CREATE_DRUG_MUTATION = gql`
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

export const UPDATE_DRUG_MUTATION = gql`
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

export const DELETE_DRUG_MUTATION = gql`
  mutation DeleteDrug($id: String!) {
    deleteDrug(id: $id)
  }
`;

export const GET_UPCOMING_DRUGS_QUERY = gql`
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
