import { render } from "./rendering";
import { DayDetails } from "../@types/app";
import { PaceSettings } from "../@types/app";

describe("Pace Substitution Integration Tests", () => {
  const testPaceSettings: PaceSettings = {
    raceDistance: "5K",
    goalTime: "21:00",
    units: "mi",
  };

  const marathonPaceSettings: PaceSettings = {
    raceDistance: "marathon",
    goalTime: "3:00:00",
    units: "mi",
  };

  const kmPaceSettings: PaceSettings = {
    raceDistance: "5K",
    goalTime: "21:00",
    units: "km",
  };

  describe("Basic Pace Substitution", () => {
    it("should substitute @easy@ pace placeholders in title and description", () => {
      const mockDayDetails: DayDetails = {
        title: "Easy Run @easy@",
        desc: "Run at @easy@ pace",
        dist: 4.0,
        sourceUnits: "mi",
        tags: ["Run"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      );

      expect(title).not.toContain("@easy@");
      expect(title).toMatch(/Easy Run \d:\d{2}/);
      expect(desc).not.toContain("@easy@");
      expect(desc).toMatch(/Run at \d:\d{2}/);
    });

    it("should substitute multiple pace types in complex workouts", () => {
      const mockDayDetails: DayDetails = {
        title: "Mixed Workout",
        desc: "2 mi @easy@ warm-up, 4 x 1 mi @mp@, 1 mi @easy@ cool-down",
        dist: 8.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const [, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        marathonPaceSettings,
        "test_pace_plan"
      );

      expect(desc).not.toContain("@easy@");
      expect(desc).not.toContain("@mp@");

      // Should contain multiple pace values
      const paceMatches = desc.match(/\d:\d{2}/g);
      expect(paceMatches).not.toBeNull();
      expect(paceMatches!.length).toBeGreaterThan(1);
    });

    it("should preserve non-pace content when substituting paces", () => {
      const mockDayDetails: DayDetails = {
        title: "Tempo Run",
        desc: "Run at @tempo@ pace",
        dist: 4.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      );

      expect(title).toBe("Tempo Run");
      expect(desc).toMatch(/Run at \d:\d{2} pace/);
    });
  });

  describe("Plan-Specific Pace Patterns", () => {
    it("should handle different pace patterns for different plans", () => {
      const workoutDescription = "Run @easy@ pace and @tempo@ intervals";

      const pfitzWorkout: DayDetails = {
        title: "Workout",
        desc: workoutDescription,
        dist: 6.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const hansonsWorkout: DayDetails = {
        title: "Workout",
        desc: workoutDescription,
        dist: 6.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const danielsWorkout: DayDetails = {
        title: "Workout",
        desc: workoutDescription,
        dist: 6.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const [, pfitzDesc] = render(
        pfitzWorkout,
        "mi",
        "mi",
        testPaceSettings,
        "pfitz_18_55"
      );
      const [, hansonsDesc] = render(
        hansonsWorkout,
        "mi",
        "mi",
        testPaceSettings,
        "hansons_advanced"
      );
      const [, danielsDesc] = render(
        danielsWorkout,
        "mi",
        "mi",
        testPaceSettings,
        "daniels_2q"
      );

      // All should have pace substitutions
      expect(pfitzDesc).not.toContain("@easy@");
      expect(hansonsDesc).not.toContain("@easy@");
      expect(danielsDesc).not.toContain("@easy@");

      // Different plans might produce different pace ranges (though with current implementation they're the same)
      expect(pfitzDesc).not.toBe(hansonsDesc);
      expect(hansonsDesc).not.toBe(danielsDesc);
    });
  });

  describe("Edge Cases", () => {
    it("should handle unknown plan IDs gracefully", () => {
      const mockDayDetails: DayDetails = {
        title: "Easy Run @easy@",
        desc: "Run at @easy@ pace",
        dist: 4.0,
        sourceUnits: "mi",
        tags: ["Run"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        testPaceSettings,
        "unknown_plan_id"
      );

      expect(title).not.toContain("@easy@");
      expect(desc).not.toContain("@easy@");
    });

    it("should handle null pace settings", () => {
      const mockDayDetails: DayDetails = {
        title: "Easy Run @easy@",
        desc: "Run at @easy@ pace",
        dist: 4.0,
        sourceUnits: "mi",
        tags: ["Run"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        null,
        "test_pace_plan"
      );

      // Should return original content without substitution
      expect(title).toBe("Easy Run @easy@");
      expect(desc).toBe("Run at @easy@ pace");
    });

    it("should handle content without pace placeholders", () => {
      const mockDayDetails: DayDetails = {
        title: "Rest Day",
        desc: "Complete rest or light stretching",
        dist: 0,
        sourceUnits: "mi",
        tags: ["Rest"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      );

      expect(title).toBe("Rest Day");
      expect(desc).toBe("Complete rest or light stretching");
    });

    it("should handle empty strings", () => {
      const mockDayDetails: DayDetails = {
        title: "",
        desc: "",
        dist: 0,
        sourceUnits: "mi",
        tags: [],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      );

      expect(title).toBe("");
      expect(desc).toBe("");
    });

    it("should handle malformed pace placeholders", () => {
      const mockDayDetails: DayDetails = {
        title: "Mixed Content",
        desc: "Run at @easy@ pace and avoid @@tempo@ and @invalid",
        dist: 4.0,
        sourceUnits: "mi",
        tags: ["Run"],
      };

      const [, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      );

      expect(desc).not.toContain("@easy@");
      expect(desc).toContain("@@tempo@"); // Invalid one should remain
    });
  });

  describe("Complex Workout Patterns", () => {
    it("should handle fartlek workouts with multiple pace changes", () => {
      const fartlekWorkout: DayDetails = {
        title: "Fartlek @easy@ to @interval@",
        desc: "10 min @easy@, then 8 x (90 sec @interval@, 90 sec @easy@), 10 min @easy@",
        dist: 6.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const [title, desc] = render(
        fartlekWorkout,
        "mi",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      );

      expect(title).not.toContain("@easy@");
      expect(title).not.toContain("@interval@");
      expect(desc).not.toContain("@easy@");
      expect(desc).not.toContain("@interval@");

      // Should have multiple pace values
      const titlePaces = title.match(/\d:\d{2}/g);
      const descPaces = desc.match(/\d:\d{2}/g);
      expect(titlePaces).not.toBeNull();
      expect(descPaces).not.toBeNull();
      expect(descPaces!.length).toBeGreaterThan(3); // Multiple intervals
    });

    it("should handle threshold workouts with warm-up and cool-down", () => {
      const thresholdWorkout: DayDetails = {
        title: "Threshold Workout",
        desc: "2 mi @easy@ warm-up, 6 mi @tempo@, 2 mi @easy@ cool-down",
        dist: 10.0,
        sourceUnits: "mi",
        tags: ["Run", "Speedwork"],
      };

      const [title, desc] = render(
        thresholdWorkout,
        "mi",
        "mi",
        marathonPaceSettings,
        "test_pace_plan"
      );

      expect(title).not.toContain("@tempo@");
      expect(desc).not.toContain("@tempo@");
      expect(desc).not.toContain("@easy@");

      // Should contain pace values
      const descPaces = desc.match(/\d:\d{2}/g);
      expect(descPaces).not.toBeNull();
      expect(descPaces!.length).toBeGreaterThanOrEqual(2); // At least easy and tempo pace
    });
  });

  describe("Unit Conversion Integration", () => {
    it("should handle pace substitution with km units", () => {
      const mockDayDetails: DayDetails = {
        title: "Easy Run @easy@",
        desc: "Run at @easy@ pace",
        dist: 6.0,
        sourceUnits: "km",
        tags: ["Run"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "km",
        "km",
        kmPaceSettings,
        "test_pace_plan"
      );

      expect(title).not.toContain("@easy@");
      expect(desc).not.toContain("@easy@");
      expect(title).toMatch(/\d:\d{2}/);
    });

    it("should handle unit conversion and pace substitution together", () => {
      const mockDayDetails: DayDetails = {
        title: "Tempo Run",
        desc: "Run at @tempo@ pace",
        dist: 5.0, // km in source
        sourceUnits: "km",
        tags: ["Run", "Speedwork"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "km",
        "mi",
        testPaceSettings,
        "test_pace_plan"
      ); // User prefers miles

      expect(title).not.toContain("@tempo@");
      expect(desc).not.toContain("@tempo@");
      // Both unit conversion and pace substitution should work
    });
  });

  describe("Pfitzinger-Specific Patterns", () => {
    it("should handle Pfitzinger marathon race pace pattern", () => {
      const mockDayDetails: DayDetails = {
        title: "Marathon Pace Run",
        desc: "12 mi w/ 8 mi @ marathon race pace",
        dist: 12.0,
        sourceUnits: "mi",
        tags: ["Run", "Long Run"],
      };

      const [title, desc] = render(
        mockDayDetails,
        "mi",
        "mi",
        marathonPaceSettings,
        "pfitz_18_55"
      );

      // The specific pattern should be replaced
      expect(desc).not.toContain("@easy@");
      expect(desc).not.toContain("@tempo@");
      expect(title).not.toContain("@mp@");

      // Should contain marathon pace
      expect(desc).toMatch(/\d:\d{2}/);
    });
  });

  describe("Performance and Consistency", () => {
    it("should produce consistent results across multiple calls", () => {
      const mockDayDetails: DayDetails = {
        title: "Easy Run @easy@",
        desc: "Run at @easy@ pace for recovery",
        dist: 4.0,
        sourceUnits: "mi",
        tags: ["Run"],
      };

      const results = [];
      for (let i = 0; i < 5; i++) {
        const result = render(
          mockDayDetails,
          "mi",
          "mi",
          testPaceSettings,
          "test_pace_plan"
        );
        results.push(result);
      }

      // All results should be identical
      const [firstTitle, firstDesc] = results[0];
      results.forEach(([title, desc]) => {
        expect(title).toBe(firstTitle);
        expect(desc).toBe(firstDesc);
      });
    });
  });
});
