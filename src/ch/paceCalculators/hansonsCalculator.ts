/**
 * Hansons Marathon Method Pace Calculator
 *
 * Based on the Hansons Marathon Method by Keith and Kevin Hanson.
 * Emphasizes cumulative fatigue and speed work at goal marathon pace.
 */

import { Units } from "../../@types/app";
import {
  BasePaceCalculator,
  RaceTime,
  PaceZones,
  PaceZoneLabels,
} from "./baseCalculator";

export class HansonsPaceCalculator extends BasePaceCalculator {
  name = "Hansons Marathon Method";
  description =
    "Training zones based on cumulative fatigue principle and goal marathon pace";
  supportedDistances = ["5K", "10K", "half", "marathon"];

  zoneLabels: PaceZoneLabels = {
    easy: "Easy Pace (EP)",
    marathon: "Marathon Pace (MP)",
    threshold: "Tempo Pace (TP)",
    interval: "Speed Pace (SP)",
    recovery: "Long Run Pace",
    long: "Long Run Pace (LRP)",
  };

  calculatePaces(raceTime: RaceTime, units: Units): PaceZones {
    const vdot = this.estimateVDOT(raceTime);

    // Hansons approach: Everything builds around marathon pace
    const fiveKPaceSecsPerMile =
      29.54 + 5.000663 * vdot - 0.007546 * vdot * vdot;
    const baseUnits: Units = "mi";

    const fiveKPace =
      units === baseUnits
        ? fiveKPaceSecsPerMile
        : this.convertPaceUnits(fiveKPaceSecsPerMile, baseUnits, units);

    // Hansons training zones (marathon pace is central)
    const marathonPace = fiveKPace * 1.15;

    return {
      easy: marathonPace * 1.25, // Easy: Much slower than marathon pace
      marathon: marathonPace, // Marathon: Goal race pace
      threshold: marathonPace * 0.94, // Threshold: Faster than marathon (strength runs)
      interval: fiveKPace * 0.98, // Interval: Close to 5K pace (speed work)
      recovery: fiveKPace * 0.93, // Recovery: Faster than 5K pace
      long: marathonPace * 1.2, // Long: Slightly slower than marathon pace
    };
  }
}
