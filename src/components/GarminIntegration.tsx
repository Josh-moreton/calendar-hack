/**
 * Garmin Connect Integration Component
 * Provides UI for connecting to Garmin and scheduling training plans
 */

import React, { useState, useEffect } from 'react';
import { useGarminAPI } from '../ch/useGarminAuth';
import { TrainingPlanScheduleRequest } from '../@types/garmin';
import { DayDetails } from '../@types/app';

interface GarminIntegrationProps {
  trainingPlan?: {
    name: string;
    startDate: string;
    workouts: { date: string; dayDetails: DayDetails }[];
  };
  onScheduleComplete?: (success: boolean, message: string) => void;
}

// Garmin OAuth configuration (would come from environment variables)
const GARMIN_CONFIG = {
  consumerKey: process.env.REACT_APP_GARMIN_CONSUMER_KEY || '',
  consumerSecret: process.env.REACT_APP_GARMIN_CONSUMER_SECRET || '',
  redirectUri: process.env.REACT_APP_GARMIN_REDIRECT_URI || `${window.location.origin}/garmin/callback`,
  scopes: ['WORKOUT_IMPORT']
};

export const GarminIntegration: React.FC<GarminIntegrationProps> = ({
  trainingPlan,
  onScheduleComplete
}) => {
  const garmin = useGarminAPI(GARMIN_CONFIG);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleResult, setScheduleResult] = useState<{
    success: boolean;
    summary?: any;
    errors?: string[];
  } | null>(null);

  // Handle OAuth callback
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('oauth_token') && searchParams.has('oauth_verifier')) {
      garmin.handleCallback(searchParams);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [garmin]);

  const handleScheduleTrainingPlan = async () => {
    if (!trainingPlan || !garmin.user) return;

    setIsScheduling(true);
    setScheduleResult(null);

    try {
      const request: TrainingPlanScheduleRequest = {
        planName: trainingPlan.name,
        startDate: trainingPlan.startDate,
        workouts: trainingPlan.workouts,
        userPreferences: {
          units: 'metric', // Could be configurable
          heartRateZones: {
            zone1: { min: 100, max: 130 },
            zone2: { min: 130, max: 150 },
            zone3: { min: 150, max: 170 },
            zone4: { min: 170, max: 185 },
            zone5: { min: 185, max: 200 }
          },
          speedZones: {
            recovery: { min: 2.5, max: 3.0 },
            easy: { min: 3.0, max: 3.5 },
            marathon: { min: 3.5, max: 4.0 },
            threshold: { min: 4.0, max: 4.5 },
            interval: { min: 4.5, max: 5.5 },
            repetition: { min: 5.5, max: 6.5 }
          }
        }
      };

      const result = await garmin.api.scheduleTrainingPlan(request);
      
      setScheduleResult({
        success: result.success,
        summary: result.summary,
        errors: result.failedWorkouts?.map(fw => `${fw.date}: ${fw.error}`)
      });

      if (onScheduleComplete) {
        const message = result.success 
          ? `Successfully scheduled ${result.summary?.successfullyScheduled} workouts!`
          : `Scheduled ${result.summary?.successfullyScheduled} workouts, ${result.summary?.failed} failed.`;
        onScheduleComplete(result.success, message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to schedule training plan';
      setScheduleResult({
        success: false,
        errors: [errorMessage]
      });
      
      if (onScheduleComplete) {
        onScheduleComplete(false, errorMessage);
      }
    } finally {
      setIsScheduling(false);
    }
  };

  if (garmin.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading Garmin connection...</span>
      </div>
    );
  }

  if (garmin.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Garmin Connection Error</h3>
            <div className="mt-2 text-sm text-red-700">{garmin.error}</div>
            <div className="mt-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-100 px-2 py-1 rounded text-sm text-red-800 hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!garmin.isAuthenticated) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Connect to Garmin</h3>
          <p className="mt-1 text-sm text-gray-500">
            Connect your Garmin account to automatically schedule workouts directly to your Garmin device.
          </p>
          <div className="mt-6">
            <button
              onClick={garmin.login}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Connect Garmin Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasWorkoutImportPermission = garmin.permissions?.permissions?.includes('WORKOUT_IMPORT') ?? true; // Default to true if permissions not available

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">Garmin Connected</h3>
            <p className="text-xs text-gray-500">User ID: {garmin.user?.userId}</p>
          </div>
        </div>
        <button
          onClick={garmin.logout}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Disconnect
        </button>
      </div>

      {!hasWorkoutImportPermission && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Limited Permissions</h3>
              <div className="mt-2 text-sm text-yellow-700">
                Workout import permission is required to schedule training plans. Please reconnect with full permissions.
              </div>
            </div>
          </div>
        </div>
      )}

      {trainingPlan && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Training Plan</h4>
          <div className="bg-gray-50 rounded-md p-3 mb-4">
            <div className="text-sm text-gray-900 font-medium">{trainingPlan.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {trainingPlan.workouts.length} workouts starting {new Date(trainingPlan.startDate).toLocaleDateString()}
            </div>
          </div>

          {hasWorkoutImportPermission && (
            <button
              onClick={handleScheduleTrainingPlan}
              disabled={isScheduling}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScheduling ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scheduling Workouts...
                </>
              ) : (
                'Schedule Training Plan to Garmin'
              )}
            </button>
          )}
        </div>
      )}

      {scheduleResult && (
        <div className={`mt-4 p-3 rounded-md ${scheduleResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {scheduleResult.success ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${scheduleResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {scheduleResult.success ? 'Training Plan Scheduled!' : 'Scheduling Issues'}
              </h3>
              {scheduleResult.summary && (
                <div className={`mt-2 text-sm ${scheduleResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  Successfully scheduled: {scheduleResult.summary.successfullyScheduled}/{scheduleResult.summary.totalWorkouts} workouts
                  {scheduleResult.summary.failed > 0 && (
                    <div className="mt-1">Failed: {scheduleResult.summary.failed} workouts</div>
                  )}
                </div>
              )}
              {scheduleResult.errors && scheduleResult.errors.length > 0 && (
                <div className="mt-2">
                  <details className="text-sm text-red-700">
                    <summary className="cursor-pointer hover:text-red-800">View errors</summary>
                    <ul className="mt-1 list-disc list-inside">
                      {scheduleResult.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
