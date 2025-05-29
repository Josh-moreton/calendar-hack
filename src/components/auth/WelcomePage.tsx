/**
 * Welcome Page Component
 * Shows a welcome message after successful signup and email verification
 */

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function WelcomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
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
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Stridr!
          </h2>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            Hi {user.displayName || user.email}, your account is ready to go.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Ready to start your training journey?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-left">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                    1
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Create your training calendar</p>
                  <p className="text-sm text-gray-500">Build personalized training plans for your running goals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-left">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                    2
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Connect your devices</p>
                  <p className="text-sm text-gray-500">Sync with Garmin and other fitness platforms</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-left">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                    3
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Track your progress</p>
                  <p className="text-sm text-gray-500">Monitor your training and achieve your goals</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/calendar"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start creating your training plan
            </Link>
            
            <Link
              to="/connect"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Connect your devices
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help getting started?{" "}
            <Link to="/about" className="text-blue-600 hover:text-blue-500">
              Learn more about Stridr
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
