import React, { useState } from 'react';
import { FitEncoder } from '../ch/fitEncoder';
import { FitSport, FitIntensity, FitDurationType, FitTargetType } from '../@types/fit';

interface FitExportButtonProps {
  workout: {
    title: string;
    description?: string;
    distance?: number;
    pace?: string;
    units?: string;
  };
  date?: Date;
  className?: string;
}

export const FitExportButton: React.FC<FitExportButtonProps> = ({ 
  workout, 
  date = new Date(), 
  className = '' 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const convertWorkoutToFitData = (workout: any) => {
    // Convert pace to appropriate intensity and heart rate zone
    const getPaceInfo = (pace?: string) => {
      switch (pace?.toLowerCase()) {
        case 'recovery':
          return { intensity: FitIntensity.Active, hrZone: 1 };
        case 'easy':
          return { intensity: FitIntensity.Active, hrZone: 2 };
        case 'long':
          return { intensity: FitIntensity.Active, hrZone: 2 };
        case 'marathon':
          return { intensity: FitIntensity.Active, hrZone: 3 };
        case 'threshold':
          return { intensity: FitIntensity.Active, hrZone: 4 };
        case 'interval':
          return { intensity: FitIntensity.Active, hrZone: 5 };
        case 'repetition':
          return { intensity: FitIntensity.Active, hrZone: 5 };
        default:
          return { intensity: FitIntensity.Active, hrZone: 2 };
      }
    };

    const paceInfo = getPaceInfo(workout.pace);
    const distanceInMeters = workout.distance ? 
      (workout.units === 'mi' ? workout.distance * 1609.34 : workout.distance * 1000) : 
      5000; // Default 5km

    return {
      fileId: {
        type: 5,
        manufacturer: 255, // Development/Other
        product: 0,
        serialNumber: Math.floor(Math.random() * 1000000),
        timeCreated: Math.floor(date.getTime() / 1000)
      },
      workout: {
        wktName: workout.title,
        sport: FitSport.Running,
        numValidSteps: 1
      },
      workoutSteps: [
        {
          messageIndex: 0,
          wktStepName: workout.title,
          notes: workout.description || `${workout.distance} ${workout.units || 'km'} at ${workout.pace || 'easy'} pace`,
          intensity: paceInfo.intensity,
          durationType: FitDurationType.Distance,
          durationDistance: distanceInMeters,
          targetType: FitTargetType.HeartRate,
          targetHrZone: paceInfo.hrZone
        }
      ]
    };
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('idle');

    try {
      const fitData = convertWorkoutToFitData(workout);
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

        setExportStatus('success');
        
        // Reset status after 3 seconds
        setTimeout(() => setExportStatus('idle'), 3000);
      } else {
        throw new Error(result.error || 'Failed to generate FIT file');
      }
    } catch (error) {
      console.error('FIT export error:', error);
      setExportStatus('error');
      setTimeout(() => setExportStatus('idle'), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const getButtonText = () => {
    if (isExporting) return 'Generating...';
    if (exportStatus === 'success') return '✓ Downloaded!';
    if (exportStatus === 'error') return '✗ Error';
    return 'Export to Garmin';
  };

  const getButtonClass = () => {
    const baseClass = 'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200';
    
    if (exportStatus === 'success') {
      return `${baseClass} bg-green-100 text-green-800 border border-green-300`;
    }
    if (exportStatus === 'error') {
      return `${baseClass} bg-red-100 text-red-800 border border-red-300`;
    }
    if (isExporting) {
      return `${baseClass} bg-gray-100 text-gray-600 border border-gray-300 cursor-not-allowed`;
    }
    
    return `${baseClass} bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700 active:bg-blue-800`;
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`${getButtonClass()} ${className}`}
      title="Export this workout as a FIT file for Garmin devices"
    >
      {isExporting ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{getButtonText()}</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>{getButtonText()}</span>
        </span>
      )}
    </button>
  );
};

export default FitExportButton;
