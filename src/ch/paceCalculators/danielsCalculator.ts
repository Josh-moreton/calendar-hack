/**
 * Jack Daniels Pace Calculator
 *
 * Based on Daniels' Running Formula by Jack Daniels.
 * The original scientific approach to training paces using VDOT.
 */

import { Units } from "../../@types/app";
import {
  BasePaceCalculator,
  RaceTime,
  PaceZones,
  PaceZoneLabels,
} from "./baseCalculator";

export class DanielsPaceCalculator extends BasePaceCalculator {
  name = "Jack Daniels";
  description =
    "Original VDOT-based training zones from Daniels' Running Formula";
  supportedDistances = [
    "1500m",
    "mile",
    "5K",
    "8K",
    "10K",
    "15K",
    "10M",
    "half",
    "marathon",
  ];

  zoneLabels: PaceZoneLabels = {
    easy: "Easy (E)",
    marathon: "Marathon (M)",
    threshold: "Threshold (T)",
    interval: "Interval (I)",
    repetition: "Repetition (R)",
  };

  calculatePaces(raceTime: RaceTime, units: Units): PaceZones {
    const vdot = this.estimateVDOT(raceTime);

    // Daniels' approach: The gold standard for VDOT-based training
    const fiveKPaceSecsPerMile =
      29.54 + 5.000663 * vdot - 0.007546 * vdot * vdot;
    const baseUnits: Units = "mi";

    const fiveKPace =
      units === baseUnits
        ? fiveKPaceSecsPerMile
        : this.convertPaceUnits(fiveKPaceSecsPerMile, baseUnits, units);

    // Original Daniels training zones
    return {
      easy: fiveKPace * 1.35, // Easy: 35% slower than 5K pace
      marathon: fiveKPace * 1.15, // Marathon: 15% slower than 5K pace
      threshold: fiveKPace * 1.08, // Threshold: 8% slower than 5K pace
      interval: fiveKPace * 1.0, // Interval: 5K pace
      repetition: fiveKPace * 0.95, // Repetition: 5% faster than 5K pace
    };
  }
}
