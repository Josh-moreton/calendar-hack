import {
  substitutePaces,
  containsPacePlaceholders,
  findPacePlaceholders,
} from "./paceSubstitution";
import { PaceSettings } from "../@types/app";

describe("Pace Substitution", () => {
  const samplePaceSettings: PaceSettings = {
    raceDistance: "5K",
    goalTime: "20:00",
    units: "mi" as const,
  };

  describe("substitutePaces", () => {
    it("should substitute @easy@ placeholder", () => {
      const text = "Run 3 miles at @easy@ pace";
      const result = substitutePaces(text, samplePaceSettings);
      expect(result).toContain("7:");
      expect(result).not.toContain("@easy@");
    });

    it("should substitute @mp@ placeholder", () => {
      const text = "Run 2 miles at @mp@ pace";
      const result = substitutePaces(text, samplePaceSettings);
      expect(result).toContain("6:");
      expect(result).not.toContain("@mp@");
    });

    it("should substitute @tempo@ placeholder", () => {
      const text = "Run 1 mile at @tempo@ pace";
      const result = substitutePaces(text, samplePaceSettings);
      expect(result).toContain("6:");
      expect(result).not.toContain("@tempo@");
    });

    it("should substitute @interval@ placeholder", () => {
      const text = "Run 800m at @interval@ pace";
      const result = substitutePaces(text, samplePaceSettings);
      expect(result).toContain("5:");
      expect(result).not.toContain("@interval@");
    });

    it("should substitute multiple placeholders in one text", () => {
      const text = "Warm up @easy@, then 2 miles @tempo@, cool down @easy@";
      const result = substitutePaces(text, samplePaceSettings);
      expect(result).not.toContain("@easy@");
      expect(result).not.toContain("@tempo@");
      expect(result).toContain("7:"); // easy pace
      expect(result).toContain("6:"); // tempo pace
    });

    it("should return original text when no pace settings provided", () => {
      const text = "Run at @easy@ pace";
      const result = substitutePaces(text, null);
      expect(result).toBe(text);
    });

    it("should return original text when no placeholders found", () => {
      const text = "Run 3 miles at easy pace";
      const result = substitutePaces(text, samplePaceSettings);
      expect(result).toBe(text);
    });
  });

  describe("containsPacePlaceholders", () => {
    it("should detect @easy@ placeholder", () => {
      expect(containsPacePlaceholders("Run at @easy@ pace")).toBe(true);
    });

    it("should detect @mp@ placeholder", () => {
      expect(containsPacePlaceholders("Run at @mp@ pace")).toBe(true);
    });

    it("should detect multiple placeholders", () => {
      expect(containsPacePlaceholders("Warm up @easy@, run @tempo@")).toBe(
        true
      );
    });

    it("should return false when no placeholders found", () => {
      expect(containsPacePlaceholders("Run 3 miles")).toBe(false);
    });
  });

  describe("findPacePlaceholders", () => {
    it("should find @easy@ placeholder", () => {
      const result = findPacePlaceholders("Run at @easy@ pace");
      expect(result).toContain("easy");
    });

    it("should find multiple placeholders", () => {
      const result = findPacePlaceholders(
        "Warm up @easy@, run @tempo@, finish @mp@"
      );
      expect(result).toContain("easy");
      expect(result).toContain("tempo");
      expect(result).toContain("mp");
    });

    it("should return empty array when no placeholders found", () => {
      const result = findPacePlaceholders("Run 3 miles");
      expect(result).toEqual([]);
    });
  });
});
