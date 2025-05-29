/**
 * React Hook for Garmin Connect OAuth Authentication
 * Manages OAuth flow, token storage, and user session
 */

import { useState, useEffect, useCallback } from 'react';
import { GarminConnectClient } from '../ch/garminClient';
import { 
  GarminOAuthConfig, 
  GarminUserTokens, 
  GarminUserPermissions 
} from '../@types/garmin';

interface GarminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: GarminUserTokens | null;
  permissions: GarminUserPermissions | null;
  error: string | null;
}

interface GarminAuthActions {
  login: () => Promise<void>;
  logout: () => void;
  handleCallback: (searchParams: URLSearchParams) => Promise<void>;
  refreshPermissions: () => Promise<void>;
}

const STORAGE_KEYS = {
  TOKENS: 'garmin_user_tokens',
  PERMISSIONS: 'garmin_user_permissions'
} as const;

export function useGarminAuth(config: GarminOAuthConfig): GarminAuthState & GarminAuthActions {
  const [state, setState] = useState<GarminAuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    permissions: null,
    error: null
  });

  const [client] = useState(() => new GarminConnectClient(config));

  // Load stored tokens on initialization
  useEffect(() => {
    const loadStoredTokens = async () => {
      try {
        const storedTokens = localStorage.getItem(STORAGE_KEYS.TOKENS);

        if (storedTokens) {
          const tokens: GarminUserTokens = JSON.parse(storedTokens);

          // Verify tokens are still valid by checking permissions
          try {
            const currentPermissions = await client.getUserPermissions(tokens);
            
            setState({
              isAuthenticated: true,
              isLoading: false,
              user: tokens,
              permissions: currentPermissions,
              error: null
            });

            // Update stored permissions if they changed
            localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(currentPermissions));
          } catch (error) {
            // Tokens are invalid, clear them
            localStorage.removeItem(STORAGE_KEYS.TOKENS);
            localStorage.removeItem(STORAGE_KEYS.PERMISSIONS);
            setState({
              isAuthenticated: false,
              isLoading: false,
              user: null,
              permissions: null,
              error: 'Session expired. Please log in again.'
            });
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          permissions: null,
          error: error instanceof Error ? error.message : 'Failed to load authentication'
        });
      }
    };

    loadStoredTokens();
  }, [client]);

  const login = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Get OAuth request tokens and authorization URL
      const { authUrl, requestToken, requestTokenSecret } = await client.getAuthorizationUrl();
      
      // Store request tokens for callback processing
      sessionStorage.setItem('oauth_request_token', requestToken);
      sessionStorage.setItem('oauth_request_token_secret', requestTokenSecret);

      // Redirect to Garmin OAuth
      window.location.href = authUrl;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initiate login'
      }));
    }
  }, [client]);

  const handleCallback = useCallback(async (searchParams: URLSearchParams) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Get stored request tokens
      const requestToken = sessionStorage.getItem('oauth_request_token');
      const requestTokenSecret = sessionStorage.getItem('oauth_request_token_secret');
      
      if (!requestToken || !requestTokenSecret) {
        throw new Error('Missing OAuth request tokens. Please restart the authentication process.');
      }

      // Extract OAuth verifier
      const oauthVerifier = searchParams.get('oauth_verifier');

      if (!oauthVerifier) {
        throw new Error('Missing OAuth verifier');
      }

      // Exchange for access tokens
      const tokens = await client.exchangeCodeForTokens(requestToken, requestTokenSecret, oauthVerifier);
      
      // Get user permissions
      const permissions = await client.getUserPermissions(tokens);

      // Check if user has required permissions (if available)
      if (permissions.permissions && !permissions.permissions.includes('WORKOUT_IMPORT')) {
        throw new Error('User did not grant workout import permissions');
      }

      // Store tokens securely
      localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
      localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions));

      // Clean up session storage
      sessionStorage.removeItem('oauth_request_token');
      sessionStorage.removeItem('oauth_request_token_secret');

      setState({
        isAuthenticated: true,
        isLoading: false,
        user: tokens,
        permissions,
        error: null
      });
    } catch (error) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        permissions: null,
        error: error instanceof Error ? error.message : 'Authentication failed'
      });
    }
  }, [client]);

  const logout = useCallback(() => {
    // Clear stored data
    localStorage.removeItem(STORAGE_KEYS.TOKENS);
    localStorage.removeItem(STORAGE_KEYS.PERMISSIONS);
    sessionStorage.removeItem('oauth_request_token');
    sessionStorage.removeItem('oauth_request_token_secret');

    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      permissions: null,
      error: null
    });
  }, []);

  const refreshPermissions = useCallback(async () => {
    if (!state.user) return;

    try {
      const permissions = await client.getUserPermissions(state.user);
      localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions));
      
      setState(prev => ({
        ...prev,
        permissions,
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to refresh permissions'
      }));
    }
  }, [client, state.user]);

  return {
    ...state,
    login,
    logout,
    handleCallback,
    refreshPermissions
  };
}

/**
 * Hook for using Garmin API operations (requires authentication)
 */
export function useGarminAPI(config: GarminOAuthConfig) {
  const auth = useGarminAuth(config);
  const [client] = useState(() => new GarminConnectClient(config));

  const scheduleTrainingPlan = useCallback(async (request: import('../@types/garmin').TrainingPlanScheduleRequest) => {
    if (!auth.user) {
      throw new Error('User not authenticated');
    }

    return client.scheduleTrainingPlan(request, auth.user);
  }, [client, auth.user]);

  const getScheduledWorkouts = useCallback(async (startDate: string, endDate: string) => {
    if (!auth.user) {
      throw new Error('User not authenticated');
    }

    return client.getWorkoutSchedulesByDateRange(startDate, endDate, auth.user);
  }, [client, auth.user]);

  const deleteScheduledWorkout = useCallback(async (scheduleId: number) => {
    if (!auth.user) {
      throw new Error('User not authenticated');
    }

    return client.deleteWorkoutSchedule(scheduleId, auth.user);
  }, [client, auth.user]);

  return {
    ...auth,
    api: {
      scheduleTrainingPlan,
      getScheduledWorkouts,
      deleteScheduledWorkout
    }
  };
}
