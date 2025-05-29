/**
 * Home Page Component
 * Displays different content based on authentication status
 */

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeroSection from "./HeroSection";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {!user ? (
        // Not authenticated - show welcome content
        <>
          <HeroSection />

          <div className="py-12 bg-white">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Features</h2>
              <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      Interactive Training Calendar
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Create and customize your training calendar with
                      drag-and-drop workouts.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      Device Integration
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Connect with Garmin and other fitness platforms to track
                      your progress.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">
                      Advanced Analytics
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Track your progress with detailed analytics and insights
                      on your training.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <div className="space-x-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create an Account
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Authenticated - show user dashboard
        <div className="py-10">
          <header>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user.displayName || "Runner"}!
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Your training calendar and workouts at a glance
              </p>
            </div>
          </header>
          <main>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Training Calendar Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Training Calendar
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            View Your Plan
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link
                      to="/calendar"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Go to calendar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Connect Devices Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Device Connections
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {user.garminLinked
                              ? "Garmin Connected"
                              : "Connect Devices"}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link
                      to="/connect"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Manage connections
                    </Link>
                  </div>
                </div>
              </div>

              {/* User Profile Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Your Account
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            Profile Settings
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link
                      to="/profile"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your recent running activities and calendar changes.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:px-6 text-center text-gray-500 italic">
                  {user.garminLinked ? (
                    <p>
                      Connect additional services to see more activity here.
                    </p>
                  ) : (
                    <p>Connect your devices to see your activity here.</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default HomePage;
