/**
 * Enhanced pace substitution with provider-specific calculations
 */

import { PaceSettings } from "../@types/app";
import { getPaceCalculatorForPlan } from "./paceCalculators/calculatorRegistry";
import { RaceTime } from "./paceCalculators/baseCalculator";

// Pace placeholder patterns that can be used in workout descriptions
const PACE_PATTERNS = {
  easy: /@easy@/gi,
  mp: /@mp@/gi,
  marathon: /@marathon@/gi,
  tempo: /@tempo@/gi,
  threshold: /@threshold@/gi,
  interval: /@interval@/gi,
  "5k": /@5k@/gi,
  "10k": /@10k@/gi,
  repetition: /@rep@/gi,
  repetitions: /@repetition@/gi,
  // Pfitzinger-specific pace patterns
  marathonRacePace: /@ marathon race pace/gi,
  lactateThreshold: /@ 15K to half marathon race pace/gi,
  lactateThresholdPace: /@ 15K to half marathon pace/gi,
  vo2MaxPace: /@ 5K race pace/gi,
};

/**
 * Convert PaceSettings to RaceTime format
 */
function convertToRaceTime(paceSettings: PaceSettings): RaceTime {
  const timeParts = paceSettings.goalTime.split(":").map(Number);
  let timeInSeconds: number;

  if (timeParts.length === 2) {
    timeInSeconds = timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 3) {
    timeInSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  } else {
    throw new Error("Invalid goal time format. Use MM:SS or HH:MM:SS");
  }

  return {
    distance: paceSettings.raceDistance,
    timeInSeconds,
  };
}

/**
 * Format pace as MM:SS
 */
function formatPace(paceInSeconds: number): string {
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Enhanced pace substitution with provider-specific calculations
 * @param text - The text containing pace placeholders
 * @param paceSettings - The pace calculation settings
 * @param planId - The training plan ID to determine which calculator to use
 * @returns Text with pace placeholders replaced with actual paces
 */
export function substitutePacesEnhanced(
  text: string,
  paceSettings: PaceSettings | null,
  planId?: string
): string {
  if (!paceSettings) {
    return text;
  }

  try {
    const raceTime = convertToRaceTime(paceSettings);

    // Get the appropriate calculator for this plan
    const calculator = planId
      ? getPaceCalculatorForPlan(planId)
      : getPaceCalculatorForPlan("default"); // Will return Daniels calculator

    const paces = calculator.calculatePaces(raceTime, paceSettings.units);

    let result = text;

    // Replace each pace pattern with the corresponding calculated pace
    if (paces.easy) {
      result = result.replace(PACE_PATTERNS.easy, formatPace(paces.easy));
    }

    if (paces.marathon) {
      result = result.replace(PACE_PATTERNS.mp, formatPace(paces.marathon));
      result = result.replace(
        PACE_PATTERNS.marathon,
        formatPace(paces.marathon)
      );
      // Pfitzinger-specific marathon pace pattern
      result = result.replace(
        PACE_PATTERNS.marathonRacePace,
        `${formatPace(paces.marathon)} pace`
      );
    }

    if (paces.threshold) {
      result = result.replace(PACE_PATTERNS.tempo, formatPace(paces.threshold));
      result = result.replace(
        PACE_PATTERNS.threshold,
        formatPace(paces.threshold)
      );
      // Pfitzinger-specific lactate threshold patterns
      result = result.replace(
        PACE_PATTERNS.lactateThreshold,
        `${formatPace(paces.threshold)} pace`
      );
      result = result.replace(
        PACE_PATTERNS.lactateThresholdPace,
        `${formatPace(paces.threshold)} pace`
      );
    }

    if (paces.interval) {
      result = result.replace(
        PACE_PATTERNS.interval,
        formatPace(paces.interval)
      );
      result = result.replace(PACE_PATTERNS["5k"], formatPace(paces.interval));
      result = result.replace(PACE_PATTERNS["10k"], formatPace(paces.interval));
      // Pfitzinger-specific VO2Max pace pattern
      result = result.replace(
        PACE_PATTERNS.vo2MaxPace,
        `${formatPace(paces.interval)} pace`
      );
    }

    if (paces.repetition) {
      result = result.replace(
        PACE_PATTERNS.repetition,
        formatPace(paces.repetition)
      );
      result = result.replace(
        PACE_PATTERNS.repetitions,
        formatPace(paces.repetition)
      );
    }

    return result;
  } catch (error) {
    console.warn("Error substituting paces:", error);
    return text;
  }
}

/**
 * Backward compatibility: Keep original function signature
 */
export function substitutePaces(
  text: string,
  paceSettings: PaceSettings | null
): string {
  return substitutePacesEnhanced(text, paceSettings);
}

/**
 * Checks if text contains any pace placeholders
 */
export function containsPacePlaceholders(text: string): boolean {
  return Object.values(PACE_PATTERNS).some(pattern => pattern.test(text));
}

/**
 * Gets all pace placeholders found in text
 */
export function findPacePlaceholders(text: string): string[] {
  const found: string[] = [];

  for (const [name, pattern] of Object.entries(PACE_PATTERNS)) {
    if (pattern.test(text)) {
      found.push(name);
    }
    // Reset the regex global flag
    pattern.lastIndex = 0;
  }

  return found;
}
