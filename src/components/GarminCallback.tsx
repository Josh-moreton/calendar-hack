/**
 * Garmin OAuth Callback Handler
 * Handles the redirect from Garmin Connect OAuth flow
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGarminAuth } from '../ch/useGarminAuth';
import { useAuth } from '../contexts/AuthContext';

export const GarminCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user, linkGarminAccount } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing Garmin authentication...');

  // Use environment variables for configuration
  const garminOAuthConfig = {
    consumerKey: import.meta.env.VITE_GARMIN_CONSUMER_KEY as string,
    callbackUrl: import.meta.env.VITE_GARMIN_REDIRECT_URI as string,
    scopes: import.meta.env.VITE_GARMIN_SCOPES?.split(',') || ['WORKOUT_IMPORT'],
    production: import.meta.env.VITE_GARMIN_PRODUCTION_MODE === 'true',
  };

  const garmin = useGarminAuth(garminOAuthConfig);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        
        // Check for OAuth parameters
        const oauthToken = searchParams.get('oauth_token');
        const oauthVerifier = searchParams.get('oauth_verifier');
        const error = searchParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!oauthToken || !oauthVerifier) {
          throw new Error('Missing OAuth parameters');
        }
        
        // Process the callback with Garmin OAuth
        await garmin.handleCallback(searchParams);
        
        // If we have a user and Garmin user, link them
        if (user && garmin.user) {
          await linkGarminAccount(garmin.user.userId);
        }

        setStatus('success');
        setMessage('Authentication successful! Redirecting...');

        // Add the OAuth parameters to the main app's URL and redirect
        const returnUrl = localStorage.getItem('garmin_return_url') || '/';
        localStorage.removeItem('garmin_return_url');

        // Redirect back to the main app with OAuth parameters
        setTimeout(() => {
          navigate(`${returnUrl}?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`);
        }, 2000);

      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
        
        // Redirect back to main app after showing error
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    };

    handleCallback();
  }, [navigate, user, linkGarminAccount, garmin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="/training-illustration.svg"
            alt="Training Calendar"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Garmin Connect
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Authentication in progress
          </p>
        </div>
        
        <div className="rounded-md bg-white shadow p-6">
          <div className="flex items-center">
            {status === 'processing' && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
            )}
            {status === 'success' && (
              <div className="flex-shrink-0 mr-3">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {status === 'error' && (
              <div className="flex-shrink-0 mr-3">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            
            <div>
              <p className={`text-sm font-medium ${
                status === 'success' ? 'text-green-800' : 
                status === 'error' ? 'text-red-800' : 
                'text-gray-900'
              }`}>
                {message}
              </p>
              
              {status === 'processing' && (
                <p className="mt-1 text-xs text-gray-500">
                  Please wait while we complete the authentication process...
                </p>
              )}
              
              {status === 'error' && (
                <p className="mt-1 text-xs text-gray-500">
                  You will be redirected back to the application shortly.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Return to application
          </button>
        </div>
      </div>
    </div>
  );
};
