/**
 * Hal Higdon Pace Calculator
 *
 * Based on Hal Higdon's training philosophy.
 * Simple, accessible approach focused on time-based training rather than precise pace zones.
 */

import { Units } from "../../@types/app";
import { BasePaceCalculator, RaceTime, PaceZones } from "./baseCalculator";

export class HigdonPaceCalculator extends BasePaceCalculator {
  name = "Hal Higdon";
  description =
    "Simple, accessible training approach with conversational easy pace";
  supportedDistances = ["5K", "10K", "half", "marathon"];

  calculatePaces(raceTime: RaceTime, units: Units): PaceZones {
    const vdot = this.estimateVDOT(raceTime);

    // Higdon's approach: Simple and accessible
    const fiveKPaceSecsPerMile =
      29.54 + 5.000663 * vdot - 0.007546 * vdot * vdot;
    const baseUnits: Units = "mi";

    const fiveKPace =
      units === baseUnits
        ? fiveKPaceSecsPerMile
        : this.convertPaceUnits(fiveKPaceSecsPerMile, baseUnits, units);

    // Higdon training zones (simple and forgiving)
    return {
      easy: fiveKPace * 1.45, // Easy: Very conversational pace
      marathon: fiveKPace * 1.2, // Marathon: Comfortable goal pace
      threshold: fiveKPace * 1.12, // Threshold: Comfortably hard
      interval: fiveKPace * 1.05, // Interval: Moderately hard
      repetition: fiveKPace * 0.98, // Repetition: Close to 5K pace
    };
  }
}
