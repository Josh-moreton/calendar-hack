import { WorkoutConverter } from './fitConverter';

describe('Simple FIT Converter Test', () => {
  it('should create converter', () => {
    const options = {
      units: 'metric' as const,
      userHeartRateZones: {
        zone1: { min: 100, max: 130 },
        zone2: { min: 130, max: 150 },
        zone3: { min: 150, max: 170 },
        zone4: { min: 170, max: 185 },
        zone5: { min: 185, max: 200 }
      },
      userSpeedZones: {
        recovery: { min: 2.5, max: 3.0 },
        easy: { min: 3.0, max: 3.5 },
        marathon: { min: 3.5, max: 4.0 },
        threshold: { min: 4.0, max: 4.5 },
        interval: { min: 4.5, max: 5.5 },
        repetition: { min: 5.5, max: 6.5 }
      }
    };
    
    const converter = new WorkoutConverter(options);
    expect(converter).toBeDefined();
  });
});
