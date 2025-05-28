// Integration test for pace substitution
import { substitutePaces } from './paceSubstitution';
import { PaceSettings } from '../@types/app';

describe('Pace Substitution Integration', () => {
  const mockPaceSettings: PaceSettings = {
    raceDistance: '5K',
    goalTime: '20:00',
    units: 'mi'
  };

  it('should substitute multiple pace placeholders in complex workout description', () => {
    const workoutDescription = `
      Warm-up: 10 minutes at @easy@ pace
      Main set: 3 x 1 mile at @threshold@ pace with 2 minutes recovery
      Tempo run: 20 minutes at @mp@ pace
      Intervals: 6 x 400m at @interval@ pace with 90 seconds recovery
      Cool-down: 10 minutes at @easy@ pace
    `;

    const result = substitutePaces(workoutDescription, mockPaceSettings);
    
    // Should contain actual pace values, not placeholders
    expect(result).not.toContain('@easy@');
    expect(result).not.toContain('@threshold@');
    expect(result).not.toContain('@mp@');
    expect(result).not.toContain('@interval@');
    
    // Should contain formatted paces (M:SS format)
    expect(result).toMatch(/\d:\d{2}/);
  });

  it('should handle marathon settings', () => {
    const marathonSettings: PaceSettings = {
      raceDistance: 'marathon',
      goalTime: '3:30:00',
      units: 'mi'
    };

    const workoutDescription = 'Long run: 20 miles at @easy@ pace with last 6 miles at @mp@ pace';
    const result = substitutePaces(workoutDescription, marathonSettings);
    
    expect(result).not.toContain('@easy@');
    expect(result).not.toContain('@mp@');
    expect(result).toMatch(/\d:\d{2}/);
  });
});
