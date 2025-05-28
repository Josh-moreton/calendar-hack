import { substitutePaces } from './paceSubstitution';
import { PaceSettings } from '../@types/app';

describe('Pace Substitution', () => {
  const samplePaceSettings: PaceSettings = {
    raceDistance: '5K',
    goalTime: '20:00',
    units: 'mi' as const
  };

  test('should substitute @easy@ placeholder', () => {
    const text = 'Run 3 miles at @easy@ pace';
    const result = substitutePaces(text, samplePaceSettings);
    console.log('Original:', text);
    console.log('Result:', result);
    expect(result).not.toBe(text);
    expect(result).not.toContain('@easy@');
  });
});
