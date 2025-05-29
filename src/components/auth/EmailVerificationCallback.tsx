/**
 * Email Verification Callback Component
 * Handles the callback when users click the verification link in their email
 */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import supabase from "../../lib/supabase";

export function EmailVerificationCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if we have the necessary tokens in the URL
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');
        const type = searchParams.get('type');

        if (type === 'signup' && access_token && refresh_token) {
          // Set the session with the tokens from the URL
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            throw error;
          }

          if (data.user) {
            setStatus('success');
            setMessage("Email verified successfully! Welcome to Stridr.");
            
            // Redirect to the welcome page after a short delay
            setTimeout(() => {
              navigate('/welcome', { replace: true });
            }, 2000);
          }
        } else {
          // If we don't have the right parameters, check if user is already verified
          if (user?.emailVerified) {
            setStatus('success');
            setMessage("Your email is already verified!");
            setTimeout(() => navigate('/welcome', { replace: true }), 2000);
          } else {
            throw new Error("Invalid verification link or missing parameters");
          }
        }
      } catch (error: any) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage(error.message || "Failed to verify email. Please try again.");
      }
    };

    verifyEmail();
  }, [searchParams, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`mx-auto h-12 w-12 flex items-center justify-center rounded-full ${
            status === 'verifying' ? 'bg-blue-100' :
            status === 'success' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {status === 'verifying' && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            )}
            {status === 'success' && (
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {status === 'error' && (
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {status === 'verifying' && "Verifying your email..."}
            {status === 'success' && "Email verified!"}
            {status === 'error' && "Verification failed"}
          </h2>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            {message}
          </p>
        </div>

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-green-700">
                  You'll be redirected to the app shortly. You can now start creating your training plans!
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-red-700">
                    The verification link may have expired or is invalid. Please try signing up again or request a new verification email.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/signup')}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try signing up again
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
