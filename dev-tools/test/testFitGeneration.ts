import { FitEncoder } from './fitEncoder';
import { FitSport, FitIntensity, FitDurationType, FitTargetType } from '../@types/fit';

// Test the FIT file generation system
const testWorkout = {
  fileId: {
    type: 5,
    manufacturer: 255,
    product: 0,
    serialNumber: 12345,
    timeCreated: Math.floor(Date.now() / 1000)
  },
  workout: {
    wktName: 'Test Training Plan Workout',
    sport: FitSport.Running,
    numValidSteps: 1
  },
  workoutSteps: [
    {
      messageIndex: 0,
      wktStepName: 'Easy Run',
      notes: '5 mile easy run from training plan',
      intensity: FitIntensity.Active,
      durationType: FitDurationType.Distance,
      durationDistance: 8046.72, // 5 miles in meters
      targetType: FitTargetType.HeartRate,
      targetHrZone: 2
    }
  ]
};

console.log('Testing FIT file generation...');

const result = FitEncoder.encode(testWorkout);

if (result.success) {
  console.log('✅ FIT file generated successfully!');
  console.log('📁 Filename:', result.filename);
  console.log('📊 Metadata:', JSON.stringify(result.metadata, null, 2));
  console.log('📦 File size:', result.fitFile!.length, 'bytes');
  
  // Show first few bytes of the FIT file to verify it's binary
  const firstBytes = Array.from(result.fitFile!.slice(0, 20))
    .map(b => b.toString(16).padStart(2, '0'))
    .join(' ');
  console.log('🔍 First 20 bytes (hex):', firstBytes);
  
} else {
  console.error('❌ FIT file generation failed:', result.error);
}
