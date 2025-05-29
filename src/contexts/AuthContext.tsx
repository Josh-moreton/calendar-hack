/**
 * Authentication Context and Provider
 * Provides authentication state and methods throughout the app
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import supabase from "../lib/supabase";
import { getAuthRedirectUrl } from "../lib/config";
import type {
  AuthContextType,
  AuthState,
  AppUser,
  LoginCredentials,
  RegisterCredentials,
} from "../@types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const mapSupabaseUserToAppUser = (user: any): AppUser => ({
  uid: user.id,
  email: user.email,
  displayName: user.user_metadata?.full_name || "",
  photoURL: user.user_metadata?.avatar_url || "",
  emailVerified: user.email_confirmed_at !== null,
  createdAt: user.created_at,
  lastLoginAt: user.last_sign_in_at,
  garminLinked: false, // Placeholder for Garmin integration
  preferences: {
    units: "metric",
    weekStartsOn: 0,
    timezone: "UTC",
    notifications: {
      email: true,
      workoutReminders: true,
      planUpdates: true,
    },
  },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setAuthState({
          user: mapSupabaseUserToAppUser(session.user),
          loading: false,
          error: null,
        });
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (credentials: RegisterCredentials) => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.displayName,
          display_name: credentials.displayName,
        },
        emailRedirectTo: getAuthRedirectUrl("/auth/verify"),
      },
    });

    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }

    // If signup was successful and user is confirmed immediately
    if (data.user && data.user.email_confirmed_at) {
      setAuthState({
        user: mapSupabaseUserToAppUser(data.user),
        loading: false,
        error: null,
      });
    } else {
      // User needs to confirm email - this is normal, don't set as error
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: null, // Clear any previous errors
      }));
    }
  };

  const signIn = async (credentials: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
    setAuthState({
      user: mapSupabaseUserToAppUser(data.user),
      loading: false,
      error: null,
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
    setAuthState({ user: null, loading: false, error: null });
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const updateProfile = async (updates: Record<string, any>) => {
    const { data, error } = await supabase.auth.updateUser(updates);
    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
    setAuthState(prev => ({
      ...prev,
      user: mapSupabaseUserToAppUser(data.user),
    }));
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthRedirectUrl("/welcome"),
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const signInWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: getAuthRedirectUrl("/welcome"),
      },
    });

    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const signInWithStrava = async () => {
    // For Strava, you'll need to set up a custom OAuth provider in Supabase
    // or implement a custom OAuth flow
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "strava" as any, // Custom provider
      options: {
        redirectTo: getAuthRedirectUrl("/welcome"),
        scopes: "read,activity:read",
      },
    });

    if (error) {
      setAuthState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const linkGarminAccount = async () => {
    // Placeholder for linking Garmin account
  };

  const unlinkGarminAccount = async () => {
    // Placeholder for unlinking Garmin account
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
        signInWithGoogle,
        signInWithApple,
        signInWithStrava,
        linkGarminAccount,
        unlinkGarminAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
