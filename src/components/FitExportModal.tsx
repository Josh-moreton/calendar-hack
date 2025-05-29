import React, { useState } from 'react';
import { FitEncoder } from '../ch/fitEncoder';
import { FitSport, FitIntensity, FitDurationType, FitTargetType } from '../@types/fit';

interface WorkoutData {
  title: string;
  description?: string;
  distance?: number;
  pace?: string;
  units?: string;
  tags?: string[];
}

interface FitExportModalProps {
  workout: WorkoutData;
  date?: Date;
  isOpen: boolean;
  onClose: () => void;
}

export const FitExportModal: React.FC<FitExportModalProps> = ({ 
  workout, 
  date = new Date(), 
  isOpen, 
  onClose 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<any>(null);

  if (!isOpen) return null;

  const convertToStructuredWorkout = (workout: WorkoutData) => {
    // Parse the workout title to identify structure
    const title = workout.title.toLowerCase();
    const isTempoRun = title.includes('lactate') || title.includes('threshold') || title.includes('tempo');
    const isIntervalRun = title.includes('interval') || title.includes('repeat') || title.includes('x ');

    const getPaceInfo = (pace?: string) => {
      switch (pace?.toLowerCase()) {
        case 'recovery': return { intensity: FitIntensity.Active, hrZone: 1, name: 'Recovery' };
        case 'easy': return { intensity: FitIntensity.Active, hrZone: 2, name: 'Easy' };
        case 'long': return { intensity: FitIntensity.Active, hrZone: 2, name: 'Long Run' };
        case 'marathon': return { intensity: FitIntensity.Active, hrZone: 3, name: 'Marathon' };
        case 'threshold': return { intensity: FitIntensity.Active, hrZone: 4, name: 'Threshold' };
        case 'interval': return { intensity: FitIntensity.Active, hrZone: 5, name: 'Interval' };
        case 'repetition': return { intensity: FitIntensity.Active, hrZone: 5, name: 'Repetition' };
        default: return { intensity: FitIntensity.Active, hrZone: 2, name: 'Moderate' };
      }
    };

    const mainPaceInfo = getPaceInfo(workout.pace);
    const totalDistance = workout.distance || 5; // Default 5 units
    const distanceInMeters = workout.units === 'mi' ? totalDistance * 1609.34 : totalDistance * 1000;

    // Create structured workout based on type
    if (isTempoRun && totalDistance > 3) {
      // Structured tempo: warmup + main + cooldown
      const mainDistance = Math.max(totalDistance * 0.6, 3); // 60% for main, minimum 3
      const warmupDistance = (totalDistance - mainDistance) / 2;
      const cooldownDistance = totalDistance - mainDistance - warmupDistance;

      return {
        steps: [
          {
            name: 'Warmup',
            distance: warmupDistance,
            intensity: FitIntensity.Warmup,
            hrZone: 1,
            notes: `${warmupDistance.toFixed(1)} ${workout.units || 'km'} easy warmup`
          },
          {
            name: 'Threshold',
            distance: mainDistance,
            intensity: FitIntensity.Active,
            hrZone: 4,
            notes: `${mainDistance.toFixed(1)} ${workout.units || 'km'} at threshold pace`
          },
          {
            name: 'Cooldown',
            distance: cooldownDistance,
            intensity: FitIntensity.Cooldown,
            hrZone: 1,
            notes: `${cooldownDistance.toFixed(1)} ${workout.units || 'km'} easy cooldown`
          }
        ],
        totalDistance: distanceInMeters
      };
    } else if (isIntervalRun) {
      // Simple interval structure
      return {
        steps: [
          {
            name: 'Warmup',
            distance: Math.min(totalDistance * 0.2, 2),
            intensity: FitIntensity.Warmup,
            hrZone: 1,
            notes: 'Easy warmup'
          },
          {
            name: 'Intervals',
            distance: totalDistance * 0.6,
            intensity: FitIntensity.Active,
            hrZone: 5,
            notes: 'Interval training'
          },
          {
            name: 'Cooldown',
            distance: totalDistance * 0.2,
            intensity: FitIntensity.Cooldown,
            hrZone: 1,
            notes: 'Easy cooldown'
          }
        ],
        totalDistance: distanceInMeters
      };
    } else {
      // Single step workout
      return {
        steps: [
          {
            name: workout.title,
            distance: totalDistance,
            intensity: mainPaceInfo.intensity,
            hrZone: mainPaceInfo.hrZone,
            notes: workout.description || `${totalDistance} ${workout.units || 'km'} at ${workout.pace || 'easy'} pace`
          }
        ],
        totalDistance: distanceInMeters
      };
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      const structuredWorkout = convertToStructuredWorkout(workout);
      
      const fitData = {
        fileId: {
          type: 5,
          manufacturer: 255,
          product: 0,
          serialNumber: Math.floor(Math.random() * 1000000),
          timeCreated: Math.floor(date.getTime() / 1000)
        },
        workout: {
          wktName: workout.title,
          sport: FitSport.Running,
          numValidSteps: structuredWorkout.steps.length
        },
        workoutSteps: structuredWorkout.steps.map((step, index) => {
          const stepDistanceMeters = workout.units === 'mi' ? 
            step.distance * 1609.34 : 
            step.distance * 1000;

          return {
            messageIndex: index,
            wktStepName: step.name,
            notes: step.notes,
            intensity: step.intensity,
            durationType: FitDurationType.Distance,
            durationDistance: stepDistanceMeters,
            targetType: FitTargetType.HeartRate,
            targetHrZone: step.hrZone
          };
        })
      };

      const result = FitEncoder.encode(fitData);

      if (result.success && result.fitFile) {
        // Create blob and download
        const blob = new Blob([result.fitFile], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename || 'workout.fit';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setExportResult({
          success: true,
          filename: result.filename,
          size: result.fitFile.length,
          metadata: result.metadata,
          structure: structuredWorkout
        });
      } else {
        throw new Error(result.error || 'Failed to generate FIT file');
      }
    } catch (error) {
      console.error('FIT export error:', error);
      setExportResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Export to Garmin</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900">{workout.title}</h4>
          <p className="text-sm text-gray-600">
            {workout.distance} {workout.units} • {workout.pace} pace
          </p>
          {workout.description && (
            <p className="text-sm text-gray-500 mt-1">{workout.description}</p>
          )}
        </div>

        {!exportResult && !isExporting && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              This will create a structured FIT file that can be loaded onto your Garmin device 
              for guided workout training with heart rate zones and pace targets.
            </p>
          </div>
        )}

        {exportResult && exportResult.success && (
          <div className="mb-4 p-3 bg-green-50 rounded-md">
            <h5 className="font-medium text-green-800 mb-2">✓ Export Successful!</h5>
            <div className="text-sm text-green-700 space-y-1">
              <p><strong>File:</strong> {exportResult.filename}</p>
              <p><strong>Size:</strong> {exportResult.size} bytes</p>
              <p><strong>Steps:</strong> {exportResult.metadata?.stepCount}</p>
              <p><strong>Distance:</strong> {(exportResult.metadata?.distance / 1000).toFixed(2)} km</p>
            </div>
          </div>
        )}

        {exportResult && !exportResult.success && (
          <div className="mb-4 p-3 bg-red-50 rounded-md">
            <h5 className="font-medium text-red-800 mb-1">✗ Export Failed</h5>
            <p className="text-sm text-red-700">{exportResult.error}</p>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
          {!exportResult && (
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Export FIT File'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitExportModal;
