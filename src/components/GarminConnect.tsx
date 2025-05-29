/**
 * Garmin Connect Component
 * Allows users to link their Garmin accounts to their profile
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGarminAuth } from '../ch/useGarminAuth';

// Use environment variables for configuration
const garminOAuthConfig = {
  consumerKey: import.meta.env.VITE_GARMIN_CONSUMER_KEY as string,
  callbackUrl: import.meta.env.VITE_GARMIN_REDIRECT_URI as string,
  scopes: import.meta.env.VITE_GARMIN_SCOPES?.split(',') || ['WORKOUT_IMPORT'],
  production: import.meta.env.VITE_GARMIN_PRODUCTION_MODE === 'true',
};

export const GarminConnect: React.FC = () => {
  const { user, linkGarminAccount, unlinkGarminAccount } = useAuth();
  const [isLinking, setIsLinking] = useState(false);
  const garmin = useGarminAuth(garminOAuthConfig);
  
  useEffect(() => {
    // If user has authenticated with Garmin and we have user tokens
    if (garmin.isAuthenticated && garmin.user && user && !user.garminLinked) {
      const linkAccounts = async () => {
        try {
          setIsLinking(true);
          // Link the Garmin account to the user's profile
          await linkGarminAccount(garmin.user.userId);
          setIsLinking(false);
        } catch (error) {
          console.error('Failed to link Garmin account:', error);
          setIsLinking(false);
        }
      };
      
      linkAccounts();
    }
  }, [garmin.isAuthenticated, garmin.user, user]);
  
  const handleConnect = async () => {
    try {
      await garmin.login();
    } catch (error) {
      console.error('Failed to initialize Garmin connection:', error);
    }
  };
  
  const handleDisconnect = async () => {
    try {
      if (window.confirm('Are you sure you want to disconnect your Garmin account?')) {
        await unlinkGarminAccount();
        garmin.logout();
      }
    } catch (error) {
      console.error('Failed to disconnect Garmin account:', error);
    }
  };
  
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Please sign in to connect your devices.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Connect Your Devices</h2>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mr-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Garmin Connect</h3>
              <p className="text-sm text-gray-600">
                {user.garminLinked 
                  ? "Your Garmin account is connected" 
                  : "Connect to sync workouts with Garmin Connect"}
              </p>
            </div>
          </div>
          
          <div>
            {user.garminLinked ? (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={isLinking}
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                disabled={isLinking || garmin.isLoading}
              >
                {isLinking || garmin.isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Connecting...
                  </span>
                ) : (
                  'Connect'
                )}
              </button>
            )}
          </div>
        </div>
        
        {garmin.error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {garmin.error}
          </div>
        )}
        
        {user.garminLinked && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
            Successfully connected to Garmin Connect. Your workouts can now be synchronized.
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500">
        <p>
          By connecting your accounts, your workout data will be synchronized between this app and your Garmin account.
          You can disconnect at any time to stop sharing data.
        </p>
      </div>
    </div>
  );
};

export default GarminConnect;
