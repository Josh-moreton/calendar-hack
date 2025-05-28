import { substitutePacesEnhanced } from "./paceSubstitutionEnhanced";
import { PaceSettings } from "../@types/app";

describe("Enhanced Pace Substitution", () => {
  const paceSettings: PaceSettings = {
    raceDistance: "10K",
    goalTime: "40:00",
    units: "mi",
  };

  it("should substitute basic pace patterns", () => {
    const input = "Run @easy@ for warm-up, then @interval@ pace for speed work";
    const defaultResult = substitutePacesEnhanced(
      input,
      paceSettings,
      "unknown_plan"
    );

    // Assert that defaultResult also substitutes placeholders
    expect(defaultResult).not.toContain("@interval@");
    expect(defaultResult).not.toContain("@easy@");
    expect(defaultResult).toMatch(/\d:\d{2}/);
  });
});
