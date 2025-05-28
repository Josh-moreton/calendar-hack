/**
 * Pfitzinger/Douglas Pace Calculator
 *
 * Based on the Advanced Marathoning methodology by Pete Pfitzinger & Scott Douglas.
 * Uses precise lactate threshold and VO2max zones with scientific backing.
 */

import { Units } from "../../@types/app";
import { BasePaceCalculator, RaceTime, PaceZones } from "./baseCalculator";

export class PfitzingerPaceCalculator extends BasePaceCalculator {
  name = "Pfitzinger/Douglas";
  description =
    "Scientific training zones based on Advanced Marathoning methodology";
  supportedDistances = ["5K", "10K", "15K", "10M", "half", "marathon"];

  calculatePaces(raceTime: RaceTime, units: Units): PaceZones {
    const baseUnits: Units = "km";

    // Use raceTime to calculate paces dynamically
    const timeInSeconds = raceTime.timeInSeconds;

    // Map race distances to kilometers
    let distanceInKm: number;
    switch (raceTime.distance) {
      case "5K":
        distanceInKm = 5;
        break;
      case "10K":
        distanceInKm = 10;
        break;
      case "15K":
        distanceInKm = 15;
        break;
      case "10M":
        distanceInKm = 16.09;
        break;
      case "half":
        distanceInKm = 21.1;
        break;
      case "marathon":
        distanceInKm = 42.2;
        break;
      default:
        distanceInKm = 5; // Default to 5K
    }

    // Calculate race pace per kilometer in seconds
    const racePacePerKm = timeInSeconds / distanceInKm;

    // Estimate different race paces based on current race time
    // Using VDOT-based pace relationships from Pfitzinger
    let fiveKPace: number;
    let marathonRacePace: number;

    if (raceTime.distance === "5K") {
      fiveKPace = racePacePerKm;
      marathonRacePace = racePacePerKm * 1.2; // Marathon ~20% slower than 5K
    } else if (raceTime.distance === "marathon") {
      marathonRacePace = racePacePerKm;
      fiveKPace = racePacePerKm * 0.83; // 5K ~17% faster than marathon
    } else {
      // For other distances, estimate both
      const adjustmentFactor = this.getAdjustmentFactor(raceTime.distance);
      fiveKPace = racePacePerKm * adjustmentFactor.toFiveK;
      marathonRacePace = racePacePerKm * adjustmentFactor.toMarathon;
    }

    // Pfitzinger training zones based on proper methodology
    const recoveryPace = this.convertPaceUnits(
      marathonRacePace * 1.2, // Recovery: 20% slower than marathon pace
      baseUnits,
      units
    );
    
    const easyPace = this.convertPaceUnits(
      marathonRacePace * 1.1, // Easy: 10% slower than marathon pace
      baseUnits,
      units
    );
    
    const marathonPace = this.convertPaceUnits(
      marathonRacePace, // Marathon pace
      baseUnits,
      units
    );
    
    const thresholdPace = this.convertPaceUnits(
      fiveKPace * 1.08, // Threshold: ~8% slower than 5K pace (15K-HM pace)
      baseUnits,
      units
    );
    
    const intervalPace = this.convertPaceUnits(
      fiveKPace, // VO2Max: 5K race pace
      baseUnits,
      units
    );

    return {
      easy: easyPace, // General aerobic runs
      marathon: marathonPace, // Marathon pace runs
      threshold: thresholdPace, // Lactate threshold runs
      interval: intervalPace, // VO₂max intervals
      repetition: recoveryPace, // Recovery runs (using recovery pace)
    };
  }

  private getAdjustmentFactor(distance: string): { toFiveK: number; toMarathon: number } {
    switch (distance) {
      case "10K":
        return { toFiveK: 0.95, toMarathon: 1.14 };
      case "15K":
        return { toFiveK: 0.92, toMarathon: 1.1 };
      case "10M":
        return { toFiveK: 0.9, toMarathon: 1.08 };
      case "half":
        return { toFiveK: 0.87, toMarathon: 1.04 };
      default:
        return { toFiveK: 1, toMarathon: 1.2 };
    }
  }
}
