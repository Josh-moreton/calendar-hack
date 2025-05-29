import { WorkoutConverter } from "./fitConverter";
import { FitEncoder } from "./fitEncoder";
import {
  FitSport,
  FitIntensity,
  FitDurationType,
  WorkoutConversionOptions,
} from "../@types/fit";
import { PlannedWorkout, DayDetails, Tags } from "../@types/app";

describe("FIT File Generation System", () => {
  let converter: WorkoutConverter;
  let conversionOptions: WorkoutConversionOptions;

  beforeEach(() => {
    conversionOptions = {
      units: "metric",
      userHeartRateZones: {
        zone1: { min: 100, max: 130 },
        zone2: { min: 130, max: 150 },
        zone3: { min: 150, max: 170 },
        zone4: { min: 170, max: 185 },
        zone5: { min: 185, max: 200 },
      },
      userSpeedZones: {
        recovery: { min: 2.5, max: 3.0 },
        easy: { min: 3.0, max: 3.5 },
        marathon: { min: 3.5, max: 4.0 },
        threshold: { min: 4.0, max: 4.5 },
        interval: { min: 4.5, max: 5.5 },
        repetition: { min: 5.5, max: 6.5 },
      },
    };
    converter = new WorkoutConverter(conversionOptions);
  });

  describe("PlannedWorkout Conversion", () => {
    it("should convert a basic easy run workout", () => {
      const workout: PlannedWorkout = {
        title: "Easy Run",
        description: "Easy 5 mile run",
        distance: 5.0,
        units: "mi",
        pace: "easy",
        tags: ["Run" as Tags],
      };

      const result = converter.convertPlannedWorkout(workout, "Test Easy Run");

      expect(result.fileId.type).toBe(5);
      expect(result.workout.wktName).toBe("Test Easy Run");
      expect(result.workout.sport).toBe(FitSport.Running);
      expect(result.workout.numValidSteps).toBe(1);
      expect(result.workoutSteps).toHaveLength(1);

      const step = result.workoutSteps[0];
      expect(step.wktStepName).toBe("Easy Run");
      expect(step.intensity).toBe(FitIntensity.Active);
      expect(step.durationType).toBe(FitDurationType.Distance);
      expect(step.durationDistance).toBeCloseTo(8046.72);
    });

    it("should handle rest days", () => {
      const workout: PlannedWorkout = {
        title: "Rest",
        description: "Rest day",
        distance: 0,
        units: "mi",
        tags: ["Rest" as Tags],
      };

      const result = converter.convertPlannedWorkout(workout, "Rest Day");

      expect(result.workoutSteps).toHaveLength(1);
      expect(result.workoutSteps[0].intensity).toBe(FitIntensity.Rest);
    });
  });

  describe("DayDetails Conversion", () => {
    it("should convert DayDetails with pace information", () => {
      const dayDetails: DayDetails = {
        title: "Medium-Long Run",
        desc: "Medium-long run 12 miles @ easy pace",
        dist: 12.0,
        pace: "easy",
        tags: ["Run" as Tags],
        sourceUnits: "mi",
      };

      const result = converter.convertDayDetails(
        dayDetails,
        "Medium-Long Run Workout"
      );

      expect(result.workout.wktName).toBe("Medium-Long Run Workout");
      expect(result.workout.sport).toBe(FitSport.Running);
      expect(result.workoutSteps).toHaveLength(1);

      const step = result.workoutSteps[0];
      expect(step.durationType).toBe(FitDurationType.Distance);
      expect(step.durationDistance).toBeCloseTo(19312.13);
    });
  });

  describe("FIT Encoder Integration", () => {
    it("should generate valid binary FIT data", () => {
      const workout: PlannedWorkout = {
        title: "Test Run",
        description: "Simple test run",
        distance: 5.0,
        units: "km",
        pace: "easy",
        tags: ["Run" as Tags],
      };

      const fitData = converter.convertPlannedWorkout(workout, "Test Run");
      const result = FitEncoder.encode(fitData);

      expect(result.success).toBe(true);
      expect(result.fitFile).toBeInstanceOf(Uint8Array);
      expect(result.fitFile!.length).toBeGreaterThan(0);
    });
  });
});
