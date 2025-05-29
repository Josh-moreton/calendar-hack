/**
 * Connect Devices Component
 * Central hub for connecting third-party services and devices
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ConnectDevices: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Please sign in to connect your devices and services.</p>
          <div className="mt-4">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connect Your Devices</h1>
        <p className="mt-2 text-sm text-gray-600">
          Link your training accounts to import and sync your workouts
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Garmin Connect */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-blue-700" 
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
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">Garmin Connect</h2>
                <p className="text-sm text-gray-500">
                  {user.garminLinked 
                    ? "Your Garmin account is linked"
                    : "Sync workouts with Garmin Connect"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/connect/garmin"
                className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                  user.garminLinked
                    ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    : "border-transparent text-white bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {user.garminLinked ? "Manage Connection" : "Connect"}
              </Link>
            </div>
          </div>
          {user.garminLinked && (
            <div className="bg-green-50 px-6 py-3 border-t border-green-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Connected to Garmin Connect
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Strava */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-orange-100">
                  <svg 
                    className="h-6 w-6 text-orange-500" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.065m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.172"/>
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">Strava</h2>
                <p className="text-sm text-gray-500">
                  Coming soon - Sync workouts with Strava
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button
                disabled
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">About Device Connections</h3>
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Connecting your devices allows you to sync your training calendar with your favorite fitness platforms.
          </p>
          <p>
            We only request the minimum permissions necessary to sync your workouts.
            Your connection can be removed at any time from your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectDevices;
