import { useRouter } from "@/i18n/routing";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  GET_CURRENT_USER_QUERY,
  REFRESH_TOKEN_MUTATION,
} from "@/graphql/auth.operations";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Queries
  const { data: currentUserData, loading: userLoading } = useQuery(
    GET_CURRENT_USER_QUERY,
    {
      skip:
        typeof window === "undefined" || !localStorage.getItem("auth-token"),
    },
  );

  // Mutations
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await loginMutation({
        variables: {
          data: { email, password },
        },
      });

      if (data?.login) {
        const { accessToken, refreshToken, user } = data.login;

        // Store tokens in localStorage
        localStorage.setItem("auth-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);

        // Redirect to dashboard or home
        router.push("/");

        return { success: true, user };
      }
    } catch (err: any) {
      setError(err.message || "Sign in failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await signupMutation({
        variables: {
          data: { firstname, lastname, email, password },
        },
      });

      if (data?.signup) {
        const { accessToken, refreshToken, user } = data.signup;

        // Store tokens in localStorage
        localStorage.setItem("auth-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);

        // Redirect to dashboard or home
        router.push("/");

        return { success: true, user };
      }
    } catch (err: any) {
      setError(err.message || "Sign up failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      // Remove tokens from localStorage
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");

      // Redirect to sign in page
      router.push("/signin");

      return { success: true };
    } catch (err: any) {
      setError(err.message || "Sign out failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem("refresh-token");
    if (!refreshTokenValue) {
      throw new Error("No refresh token available");
    }

    try {
      const { data } = await refreshTokenMutation({
        variables: { token: refreshTokenValue },
      });

      if (data?.refreshToken) {
        localStorage.setItem("auth-token", data.refreshToken.accessToken);
        localStorage.setItem("refresh-token", data.refreshToken.refreshToken);
        return data.refreshToken.accessToken;
      }
    } catch (err: any) {
      // If refresh fails, clear tokens and redirect to login
      localStorage.removeItem("auth-token");
      localStorage.removeItem("refresh-token");
      router.push("/signin");
      throw err;
    }
  };

  const isAuthenticated = () => {
    return (
      typeof window !== "undefined" && !!localStorage.getItem("auth-token")
    );
  };

  return {
    // State
    user: currentUserData?.me as User | null,
    loading: loading || userLoading,
    error,

    // Actions
    signIn,
    signUp,
    signOut,
    refreshToken,
    isAuthenticated,

    // Utils
    clearError: () => setError(null),
  };
};
