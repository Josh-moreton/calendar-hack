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
    const { data, error } = await supabase.auth.signUp(credentials);
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
    // Placeholder for Google sign-in
  };

  const signInWithApple = async () => {
    // Placeholder for Apple sign-in
  };

  const signInWithStrava = async () => {
    // Placeholder for Strava sign-in
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
