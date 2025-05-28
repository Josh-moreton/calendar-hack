// End-to-end test for pace calculation feature
import { PaceSettings } from '../@types/app';
import { substitutePaces } from './paceSubstitution';

describe('Pace Calculation Feature E2E', () => {
  it('should substitute pace placeholders in workout description', () => {
    const userPaceSettings: PaceSettings = {
      raceDistance: '5K',
      goalTime: '20:00',
      units: 'mi'
    };

    const workoutWithPlaceholders = 'Warm-up 1 mile @easy@, main set 3 miles @mp@, cool-down @easy@';
    const workoutWithPaces = substitutePaces(workoutWithPlaceholders, userPaceSettings);
    
    // Verify substitution worked
    expect(workoutWithPaces).not.toContain('@easy@');
    expect(workoutWithPaces).not.toContain('@mp@');
    expect(workoutWithPaces).toMatch(/\d:\d{2}/); // Should contain pace in M:SS format
  });

  it('should handle complex workout with multiple pace types', () => {
    const paceSettings: PaceSettings = {
      raceDistance: 'marathon',
      goalTime: '3:30:00',
      units: 'mi'
    };

    const complexWorkout = 'Easy: 8 miles @easy@, Tempo: 6 miles @tempo@, Long: 6 miles @mp@, Track: 8x800m @interval@';
    const result = substitutePaces(complexWorkout, paceSettings);
    
    // Verify all placeholders were replaced
    expect(result).not.toContain('@easy@');
    expect(result).not.toContain('@tempo@');
    expect(result).not.toContain('@mp@');
    expect(result).not.toContain('@interval@');
    
    // Should contain multiple paces
    const paceMatches = result.match(/\d:\d{2}/g);
    expect(paceMatches).not.toBeNull();
    expect(paceMatches!.length).toBeGreaterThan(2);
  });
});
