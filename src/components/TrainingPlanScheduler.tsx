/**
 * Training Plan Scheduler Component
 * Integrates with existing calendar to add Garmin Connect scheduling capabilities
 */

import React, { useState, useMemo } from 'react';
import { GarminIntegration } from './GarminIntegration';
import { DayDetails } from '../@types/app';

interface TrainingPlanSchedulerProps {
  plan: {
    name: string;
    weeks: Array<{
      week: number;
      days: Array<{
        dayOfWeek: number;
        dayDetails: DayDetails | null;
      }>;
    }>;
  };
  startDate: Date;
  onScheduleComplete?: (success: boolean, message: string) => void;
}

export const TrainingPlanScheduler: React.FC<TrainingPlanSchedulerProps> = ({
  plan,
  startDate,
  onScheduleComplete
}) => {
  const [showGarminIntegration, setShowGarminIntegration] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState<Set<string>>(new Set());

  // Convert plan to Garmin format
  const garminTrainingPlan = useMemo(() => {
    const workouts: { date: string; dayDetails: DayDetails }[] = [];
    
    plan.weeks.forEach((week) => {
      week.days.forEach((day) => {
        if (day.dayDetails && day.dayDetails.title !== 'Rest') {
          // Calculate the actual date for this workout
          const dayOffset = (week.week - 1) * 7 + day.dayOfWeek;
          const workoutDate = new Date(startDate);
          workoutDate.setDate(workoutDate.getDate() + dayOffset);
          
          const dateString = workoutDate.toISOString().split('T')[0];
          workouts.push({
            date: dateString,
            dayDetails: day.dayDetails
          });
        }
      });
    });

    return {
      name: plan.name,
      startDate: startDate.toISOString().split('T')[0],
      workouts
    };
  }, [plan, startDate]);

  const handleWorkoutSelection = (workoutId: string, selected: boolean) => {
    const newSelection = new Set(selectedWorkouts);
    if (selected) {
      newSelection.add(workoutId);
    } else {
      newSelection.delete(workoutId);
    }
    setSelectedWorkouts(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedWorkouts.size === garminTrainingPlan.workouts.length) {
      setSelectedWorkouts(new Set());
    } else {
      setSelectedWorkouts(new Set(garminTrainingPlan.workouts.map((_, index) => index.toString())));
    }
  };

  const filteredPlan = {
    ...garminTrainingPlan,
    workouts: garminTrainingPlan.workouts.filter((_, index) => 
      selectedWorkouts.has(index.toString())
    )
  };

  const totalWorkouts = garminTrainingPlan.workouts.length;
  const selectedCount = selectedWorkouts.size;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Training Plan Integration</h3>
            <p className="text-sm text-gray-500">
              Schedule your training plan directly to your Garmin device
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {selectedCount} of {totalWorkouts} workouts selected
            </span>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {selectedWorkouts.size === totalWorkouts ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedWorkouts.size === totalWorkouts}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-sm font-medium text-gray-900">
                {plan.name}
              </label>
              <span className="ml-auto text-sm text-gray-500">
                {totalWorkouts} workouts
              </span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {garminTrainingPlan.workouts.map((workout, index) => {
              const workoutId = index.toString();
              const isSelected = selectedWorkouts.has(workoutId);
              const workoutDate = new Date(workout.date);

              return (
                <div
                  key={workoutId}
                  className={`px-4 py-3 border-b border-gray-200 hover:bg-gray-50 ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleWorkoutSelection(workoutId, e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {workout.dayDetails.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {workoutDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          {workout.dayDetails.dist && workout.dayDetails.dist > 0 && (
                            <p className="text-xs text-gray-500">
                              {workout.dayDetails.dist} {workout.dayDetails.sourceUnits || 'mi'}
                            </p>
                          )}
                          {workout.dayDetails.pace && (
                            <p className="text-xs text-blue-600 capitalize">
                              {workout.dayDetails.pace} pace
                            </p>
                          )}
                        </div>
                      </div>
                      {workout.dayDetails.desc && (
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          {workout.dayDetails.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Selected workouts will be scheduled to your Garmin Connect account
          </div>
          <button
            onClick={() => setShowGarminIntegration(true)}
            disabled={selectedCount === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Schedule to Garmin
          </button>
        </div>
      </div>

      {showGarminIntegration && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Schedule Training Plan to Garmin
              </h3>
              <button
                onClick={() => setShowGarminIntegration(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <GarminIntegration
              trainingPlan={filteredPlan}
              onScheduleComplete={(success, message) => {
                if (onScheduleComplete) {
                  onScheduleComplete(success, message);
                }
                setShowGarminIntegration(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
