import React, { useState } from 'react';
import FitExportModal from './FitExportModal';

interface FitIntegrationProps {
  workout: {
    title: string;
    description?: string;
    distance?: number;
    pace?: string;
    units?: string;
    tags?: string[];
  };
  date?: Date;
  children?: (props: { openFitExport: () => void }) => React.ReactNode;
}

/**
 * FIT Integration Component
 * 
 * This component provides FIT file export functionality that can be easily
 * integrated into existing training plan calendar components.
 * 
 * Usage examples:
 * 
 * 1. With render prop pattern:
 *    <FitIntegration workout={workout} date={date}>
 *      {({ openFitExport }) => (
 *        <button onClick={openFitExport}>Export to Garmin</button>
 *      )}
 *    </FitIntegration>
 * 
 * 2. Direct integration:
 *    <FitIntegration workout={workout} date={date} />
 */
export const FitIntegration: React.FC<FitIntegrationProps> = ({ 
  workout, 
  date, 
  children 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openFitExport = () => setIsModalOpen(true);
  const closeFitExport = () => setIsModalOpen(false);

  // If children function is provided, use render prop pattern
  if (children) {
    return (
      <>
        {children({ openFitExport })}
        <FitExportModal
          workout={workout}
          date={date}
          isOpen={isModalOpen}
          onClose={closeFitExport}
        />
      </>
    );
  }

  // Default UI if no children provided
  return (
    <>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{workout.title}</h4>
          <p className="text-sm text-gray-600">
            {workout.distance} {workout.units} • {workout.pace} pace
          </p>
        </div>
        <button
          onClick={openFitExport}
          className="ml-3 px-3 py-1 text-sm font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50"
        >
          Export to Garmin
        </button>
      </div>
      
      <FitExportModal
        workout={workout}
        date={date}
        isOpen={isModalOpen}
        onClose={closeFitExport}
      />
    </>
  );
};

export default FitIntegration;
