import { substitutePaceWithCalculated } from './paceSubstitutionEnhanced';
import { substitutePacesEnhanced } from './paceSubstitutionEnhanced';
import { PaceSettings } from '../@types/app';

describe('Enhanced Pace Substitution', () => {
  const paceSettings: PaceSettings = {
    goalTime: "20:00", // 20 minute 5K
    raceDistance: "5K",
    units: "km"
  };

  test('should substitute basic pace placeholders', () => {
    const text = "Run at @easy@ pace";
    const result = substitutePacesEnhanced(text, paceSettings, "pfitz_18_55");
    expect(result).toContain("5:"); // Easy pace should be substituted with some pace
    expect(result).not.toContain("@easy@");
  });

  test('should substitute multiple pace types', () => {
    const text = "Warmup @easy@ then @threshold@ intervals";
    const result = substitutePacesEnhanced(text, paceSettings, "pfitz_18_55");
    expect(result).not.toContain("@easy@");
    expect(result).not.toContain("@threshold@");
  });

  test('should handle text without pace placeholders', () => {
    const text = "Just a regular workout description";
    const result = substitutePacesEnhanced(text, paceSettings, "pfitz_18_55");
    expect(result).toBe(text);
  });

  test('should handle unknown pace types', () => {
    const text = "Run at @unknown@ pace";
    const result = substitutePacesEnhanced(text, paceSettings, "pfitz_18_55");
    expect(result).toBe(text); // Should remain unchanged
  });
});
