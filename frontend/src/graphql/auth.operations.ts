import { gql } from "@apollo/client";

// Login Mutation (matches your backend login mutation)
export const LOGIN_MUTATION = gql`
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

// Signup Mutation (matches your backend signup mutation)
export const SIGNUP_MUTATION = gql`
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

// Refresh Token Mutation
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: JWT!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

// Get Current User Query (you might need to add this to your backend)
export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      id
      email
      firstname
      lastname
    }
  }
`;
