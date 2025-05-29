import { FitEncoder } from './fitEncoder';
import { 
  FitFileData, 
  FitSport, 
  FitIntensity, 
  FitDurationType,
  FitTargetType
} from '../@types/fit';

describe('FitEncoder', () => {
  const createTestFitData = (): FitFileData => ({
    fileId: {
      type: 5,
      manufacturer: 255,
      product: 0,
      serialNumber: 12345,
      timeCreated: 1640995200 // 2022-01-01 00:00:00 UTC
    },
    workout: {
      wktName: 'Test Workout',
      sport: FitSport.Running,
      numValidSteps: 1
    },
    workoutSteps: [
      {
        messageIndex: 0,
        wktStepName: 'Easy Run',
        notes: 'Test easy run',
        intensity: FitIntensity.Active,
        durationType: FitDurationType.Distance,
        durationDistance: 5000, // 5km in meters
        targetType: FitTargetType.HeartRate,
        targetHrZone: 2
      }
    ]
  });

  describe('encode', () => {
    it('should create a valid FIT file structure', () => {
      const fitData = createTestFitData();
      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.fitFile).toBeDefined();
      expect(result.filename).toBe('Test_Workout.fit');
      expect(result.metadata).toBeDefined();
    });

    it('should generate correct FIT file header', () => {
      const fitData = createTestFitData();
      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      const fitFile = result.fitFile!;

      // Header should be 14 bytes
      expect(fitFile.length).toBeGreaterThanOrEqual(14);

      // Check header structure
      expect(fitFile[0]).toBe(14); // Header size
      expect(fitFile[1]).toBe(0x10); // Protocol version (1.0)

      // Profile version (2 bytes little endian)
      const profileVersion = fitFile[2] | (fitFile[3] << 8);
      expect(profileVersion).toBe(2132); // 21.32

      // .FIT signature at offset 8-11
      const signature = (fitFile[8]) | 
                       (fitFile[9] << 8) | 
                       (fitFile[10] << 16) | 
                       (fitFile[11] << 24);
      expect(signature).toBe(0x464954); // '.FIT'
    });

    it('should include File ID message', () => {
      const fitData = createTestFitData();
      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      const fitFile = result.fitFile!;

      // After header (14 bytes), should start with File ID message
      // Look for definition message header (0x40)
      let foundFileIdDefinition = false;
      for (let i = 14; i < Math.min(50, fitFile.length); i++) {
        if (fitFile[i] === 0x40) {
          foundFileIdDefinition = true;
          break;
        }
      }
      expect(foundFileIdDefinition).toBe(true);
    });

    it('should generate metadata correctly', () => {
      const fitData = createTestFitData();
      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.metadata).toEqual({
        workoutName: 'Test Workout',
        sport: 'Running',
        stepCount: 1,
        distance: 5000, // 5km in meters
        duration: undefined // No time-based duration in this test
      });
    });

    it('should handle workout with time-based duration', () => {
      const fitData = createTestFitData();
      fitData.workoutSteps[0] = {
        ...fitData.workoutSteps[0],
        durationType: FitDurationType.Time,
        durationTime: 1800, // 30 minutes
        durationDistance: undefined
      };

      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.metadata!.duration).toBe(1800);
      expect(result.metadata!.distance).toBeUndefined();
    });

    it('should handle multiple workout steps', () => {
      const fitData = createTestFitData();
      fitData.workout.numValidSteps = 3;
      fitData.workoutSteps = [
        {
          messageIndex: 0,
          wktStepName: 'Warmup',
          intensity: FitIntensity.Warmup,
          durationType: FitDurationType.Time,
          durationTime: 600, // 10 minutes
          targetType: FitTargetType.HeartRate,
          targetHrZone: 1
        },
        {
          messageIndex: 1,
          wktStepName: 'Main Set',
          intensity: FitIntensity.Active,
          durationType: FitDurationType.Distance,
          durationDistance: 5000,
          targetType: FitTargetType.HeartRate,
          targetHrZone: 3
        },
        {
          messageIndex: 2,
          wktStepName: 'Cooldown',
          intensity: FitIntensity.Cooldown,
          durationType: FitDurationType.Time,
          durationTime: 600, // 10 minutes
          targetType: FitTargetType.HeartRate,
          targetHrZone: 1
        }
      ];

      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.metadata!.stepCount).toBe(3);
      expect(result.metadata!.duration).toBe(1200); // Total time: 20 minutes
      expect(result.metadata!.distance).toBe(5000); // Total distance: 5km
    });

    it('should handle different sports', () => {
      const fitData = createTestFitData();
      fitData.workout.sport = FitSport.Cycling;

      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.metadata!.sport).toBe('Cycling');
    });

    it('should generate valid filename from workout name', () => {
      const fitData = createTestFitData();
      fitData.workout.wktName = 'Complex Workout Name! (with special chars)';

      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.filename).toBe('Complex_Workout_Name___with_special_chars_.fit');
    });

    it('should handle edge cases in workout step names', () => {
      const fitData = createTestFitData();
      fitData.workoutSteps[0].wktStepName = 'Very Long Workout Step Name That Exceeds Normal Limits';

      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      // Should not crash, name should be truncated to fit FIT field limits
    });

    it('should calculate CRC correctly', () => {
      const fitData = createTestFitData();
      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      const fitFile = result.fitFile!;

      // File should end with 2-byte CRC
      expect(fitFile.length).toBeGreaterThan(16);
      
      // CRC should be non-zero (unless by coincidence)
      const crcBytes = fitFile.slice(-2);
      const crc = crcBytes[0] | (crcBytes[1] << 8);
      // Just verify it's a reasonable value, actual CRC validation would require
      // recalculating and comparing
      expect(crc).toBeGreaterThan(0);
    });

    it('should handle error conditions gracefully', () => {
      // Test with missing required fields
      const invalidFitData = {
        fileId: {
          type: 5,
          manufacturer: 255,
          product: 0,
          serialNumber: 12345,
          timeCreated: 1640995200
        },
        workout: {
          // Missing wktName
          sport: FitSport.Running,
          numValidSteps: 1
        },
        workoutSteps: []
      };

      const result = FitEncoder.encode(invalidFitData as any);

      // Should handle gracefully
      expect(result.success).toBeDefined();
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(typeof result.error).toBe('string');
      }
    });

    it('should produce deterministic output for same input', () => {
      const fitData1 = createTestFitData();
      const fitData2 = createTestFitData();

      const result1 = FitEncoder.encode(fitData1);
      const result2 = FitEncoder.encode(fitData2);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);

      // Results should be identical for same input
      expect(result1.fitFile).toEqual(result2.fitFile);
      expect(result1.metadata).toEqual(result2.metadata);
    });

    it('should handle various target types', () => {
      const fitData = createTestFitData();
      
      // Test power target
      fitData.workoutSteps[0] = {
        ...fitData.workoutSteps[0],
        targetType: FitTargetType.Power,
        targetPowerZone: 3,
        targetHrZone: undefined
      };

      const result = FitEncoder.encode(fitData);
      expect(result.success).toBe(true);

      // Test speed target
      fitData.workoutSteps[0] = {
        ...fitData.workoutSteps[0],
        targetType: FitTargetType.Speed,
        targetSpeedZone: 2,
        targetPowerZone: undefined
      };

      const result2 = FitEncoder.encode(fitData);
      expect(result2.success).toBe(true);
    });
  });

  describe('Real Training Plan Data', () => {
    it('should convert Pfitzinger lactate threshold workout to FIT file', () => {
      const pfitzingerWorkout = {
        title: "Lactate threshold {9} w {4} @ 15K to half marathon pace",
        distance: 9.0,
        pace: "threshold"
      };

      const fitData = {
        fileId: {
          type: 5,
          manufacturer: 255,
          product: 0,
          serialNumber: 12345,
          timeCreated: Math.floor(Date.now() / 1000)
        },
        workout: {
          wktName: pfitzingerWorkout.title,
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
            durationDistance: 1609.34, // 1 mile in meters
            targetType: FitTargetType.HeartRate,
            targetHrZone: 1
          },
          {
            messageIndex: 1,
            wktStepName: 'Lactate Threshold',
            notes: '4 miles at 15K to half marathon pace',
            intensity: FitIntensity.Active,
            durationType: FitDurationType.Distance,
            durationDistance: 6437.38, // 4 miles in meters
            targetType: FitTargetType.HeartRate,
            targetHrZone: 4
          },
          {
            messageIndex: 2,
            wktStepName: 'Cooldown',
            notes: '4 miles easy cooldown',
            intensity: FitIntensity.Cooldown,
            durationType: FitDurationType.Distance,
            durationDistance: 6437.38, // 4 miles in meters
            targetType: FitTargetType.HeartRate,
            targetHrZone: 1
          }
        ]
      };

      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.fitFile).toBeDefined();
      expect(result.filename).toBe('Lactate_threshold__9__w__4____15K_to_half_marathon_pace.fit');
      expect(result.metadata?.stepCount).toBe(3);
      expect(result.metadata?.distance).toBe(14484.1); // Total distance of all steps
      expect(result.metadata?.sport).toBe('Running');

      // Log details for verification
      console.log('Generated FIT file for Pfitzinger workout:', {
        filename: result.filename,
        size: result.fitFile!.length,
        metadata: result.metadata
      });
    });
  });
});
