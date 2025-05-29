import { FitEncoder } from './fitEncoder';
import { FitSport, FitIntensity, FitDurationType, FitTargetType } from '../@types/fit';

describe('FIT File Integration Test', () => {
  it('should generate a complete FIT file from training plan data', () => {
    // Simulate a simple training plan workout
    const fitData = {
      fileId: {
        type: 5,
        manufacturer: 255,
        product: 0,
        serialNumber: 12345,
        timeCreated: Math.floor(Date.now() / 1000)
      },
      workout: {
        wktName: 'Easy 5 Mile Run',
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

    const result = FitEncoder.encode(fitData);
    
    expect(result.success).toBe(true);
    expect(result.fitFile).toBeDefined();
    expect(result.filename).toBe('Easy_5_Mile_Run.fit');
    expect(result.metadata?.workoutName).toBe('Easy 5 Mile Run');
    expect(result.metadata?.sport).toBe('Running');
    expect(result.metadata?.distance).toBe(8046.72);

    // Verify the FIT file has reasonable size (should be more than header + basic messages)
    expect(result.fitFile!.length).toBeGreaterThan(50);
    
    console.log('Generated FIT file:', {
      size: result.fitFile!.length,
      filename: result.filename,
      metadata: result.metadata
    });
  });

  it('should generate FIT file for tempo workout', () => {
    const fitData = {
      fileId: {
        type: 5,
        manufacturer: 255,
        product: 0,
        serialNumber: 12345,
        timeCreated: Math.floor(Date.now() / 1000)
      },
      workout: {
        wktName: 'Tempo Run 6 Miles',
        sport: FitSport.Running,
        numValidSteps: 3
      },
      workoutSteps: [
        {
          messageIndex: 0,
          wktStepName: 'Warmup',
          notes: '1 mile easy warmup',
          intensity: FitIntensity.Warmup,
          durationType: FitDurationType.Distance,
          durationDistance: 1609.34, // 1 mile
          targetType: FitTargetType.HeartRate,
          targetHrZone: 1
        },
        {
          messageIndex: 1,
          wktStepName: 'Tempo',
          notes: '4 miles at threshold pace',
          intensity: FitIntensity.Active,
          durationType: FitDurationType.Distance,
          durationDistance: 6437.38, // 4 miles
          targetType: FitTargetType.HeartRate,
          targetHrZone: 4
        },
        {
          messageIndex: 2,
          wktStepName: 'Cooldown',
          notes: '1 mile easy cooldown',
          intensity: FitIntensity.Cooldown,
          durationType: FitDurationType.Distance,
          durationDistance: 1609.34, // 1 mile
          targetType: FitTargetType.HeartRate,
          targetHrZone: 1
        }
      ]
    };

    const result = FitEncoder.encode(fitData);
    
    expect(result.success).toBe(true);
    expect(result.metadata?.stepCount).toBe(3);
    expect(result.metadata?.distance).toBe(9656.06); // Total 6 miles
    
    console.log('Generated tempo workout FIT file:', {
      size: result.fitFile!.length,
      filename: result.filename,
      steps: result.metadata?.stepCount
    });
  });
});
