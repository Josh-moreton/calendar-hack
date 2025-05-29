import React, { useState } from 'react';
import { FitIntegration } from './FitIntegration';
import { FitExportButton } from './FitExportButton';

const FitExportDemo: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(0);

  // Sample workouts from different training plans
  const sampleWorkouts = [
    {
      title: "Recovery {5}",
      description: "Easy recovery run to promote blood flow and aid recovery",
      distance: 5.0,
      pace: "recovery",
      units: "mi",
      tags: ["Run"],
      source: "Pfitzinger 18-week Marathon Plan"
    },
    {
      title: "Lactate threshold {9} w {4} @ 15K to half marathon pace",
      description: "Lactate threshold run with warmup and cooldown",
      distance: 9.0,
      pace: "threshold",
      units: "mi",
      tags: ["Run", "Speedwork"],
      source: "Pfitzinger 18-week Marathon Plan"
    },
    {
      title: "Medium-long run {12}",
      description: "Aerobic base building run",
      distance: 12.0,
      pace: "long",
      units: "mi",
      tags: ["Run", "Long Run"],
      source: "Pfitzinger 18-week Marathon Plan"
    },
    {
      title: "General aerobic + Speed 6 miles",
      description: "8 x 100 m strides",
      distance: 6.0,
      pace: "easy",
      units: "mi",
      tags: ["Run", "Speedwork"],
      source: "Faster Road Racing 15K/10M Plan"
    },
    {
      title: "VO2max {7} w {5 x 600m @ 5K pace}",
      description: "Interval training for maximum oxygen uptake",
      distance: 7.0,
      pace: "interval",
      units: "mi",
      tags: ["Run", "Speedwork"],
      source: "Pfitzinger 18-week Marathon Plan"
    }
  ];

  const currentWorkout = sampleWorkouts[selectedWorkout];
  const workoutDate = new Date();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            FIT File Export for Training Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Convert your structured training plan workouts into FIT files that can be loaded 
            directly onto Garmin devices for guided training with heart rate zones and pace targets.
          </p>
        </div>

        {/* Workout Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Training Plan Workout</h2>
          <div className="grid gap-3">
            {sampleWorkouts.map((workout, index) => (
              <button
                key={index}
                onClick={() => setSelectedWorkout(index)}
                className={`p-4 text-left rounded-lg border transition-colors ${
                  selectedWorkout === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{workout.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{workout.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{workout.distance} {workout.units}</span>
                      <span>•</span>
                      <span>{workout.pace} pace</span>
                      <span>•</span>
                      <span className="italic">{workout.source}</span>
                    </div>
                  </div>
                  {selectedWorkout === index && (
                    <div className="ml-4 text-blue-500">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Export Demos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Simple Button Export */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Simple Export Button</h3>
            <p className="text-gray-600 mb-4">
              Quick one-click export with automatic workout structure detection.
            </p>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{currentWorkout.title}</h4>
              <p className="text-sm text-gray-600 mb-3">
                {currentWorkout.distance} {currentWorkout.units} • {currentWorkout.pace} pace
              </p>
              <FitExportButton 
                workout={currentWorkout} 
                date={workoutDate}
                className="w-full"
              />
            </div>
          </div>

          {/* Modal Export */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Export Modal</h3>
            <p className="text-gray-600 mb-4">
              Full export interface with workout preview and detailed feedback.
            </p>
            <FitIntegration workout={currentWorkout} date={workoutDate} />
          </div>
        </div>

        {/* Integration Example */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Integration Example</h3>
          <p className="text-gray-600 mb-4">
            Use render props for custom UI while leveraging the FIT export functionality.
          </p>
          <FitIntegration workout={currentWorkout} date={workoutDate}>
            {({ openFitExport }) => (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">🏃‍♂️</span>
                    <h4 className="font-medium text-gray-900">{currentWorkout.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📏 {currentWorkout.distance} {currentWorkout.units}</span>
                    <span>⏱️ {currentWorkout.pace} pace</span>
                    <span>📅 {workoutDate.toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={openFitExport}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download FIT</span>
                </button>
              </div>
            )}
          </FitIntegration>
        </div>

        {/* Technical Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
          <div className="prose text-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Workout Structure Analysis</h4>
                <ul className="text-sm space-y-1">
                  <li>• Detects tempo/threshold runs and adds warmup/cooldown</li>
                  <li>• Identifies interval sessions for structured training</li>
                  <li>• Maps pace types to appropriate heart rate zones</li>
                  <li>• Converts distances between miles and kilometers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">FIT File Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• Compatible with all Garmin devices</li>
                  <li>• Heart rate zone targeting</li>
                  <li>• Distance-based workout steps</li>
                  <li>• Proper workout metadata and descriptions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitExportDemo;
