import { PaceSettings } from "../@types/app";
import {
  calculateTrainingPaces,
  formatPace,
  RaceTime,
  RaceDistance,
} from "./paceCalculator";

// Pace placeholder patterns that can be used in workout descriptions
// Examples: @easy@, @mp@, @tempo@, @threshold@, @interval@, @5k@, @10k@
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
};

/**
 * Converts PaceSettings to RaceTime format for the pace calculator
 */
function convertToRaceTime(paceSettings: PaceSettings): RaceTime {
  // Convert goal time string (MM:SS or HH:MM:SS) to seconds
  const timeParts = paceSettings.goalTime.split(":").map(Number);
  let timeInSeconds: number;

  if (timeParts.length === 2) {
    // MM:SS format
    timeInSeconds = timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 3) {
    // HH:MM:SS format
    timeInSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  } else {
    throw new Error("Invalid goal time format. Use MM:SS or HH:MM:SS");
  }

  return {
    distance: paceSettings.raceDistance as RaceDistance,
    timeInSeconds,
  };
}

/**
 * Substitutes pace placeholders in text with calculated training paces
 * @param text - The text containing pace placeholders
 * @param paceSettings - The pace calculation settings
 * @returns Text with pace placeholders replaced with actual paces
 */
export function substitutePaces(
  text: string,
  paceSettings: PaceSettings | null
): string {
  if (!paceSettings) {
    return text;
  }

  try {
    const raceTime = convertToRaceTime(paceSettings);
    const paces = calculateTrainingPaces(raceTime, paceSettings.units);

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
    }

    if (paces.threshold) {
      result = result.replace(PACE_PATTERNS.tempo, formatPace(paces.threshold));
      result = result.replace(
        PACE_PATTERNS.threshold,
        formatPace(paces.threshold)
      );
    }

    if (paces.interval) {
      result = result.replace(
        PACE_PATTERNS.interval,
        formatPace(paces.interval)
      );
      result = result.replace(PACE_PATTERNS["5k"], formatPace(paces.interval));
      result = result.replace(PACE_PATTERNS["10k"], formatPace(paces.interval));
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
 * Checks if text contains any pace placeholders
 * @param text - The text to check
 * @returns True if text contains pace placeholders
 */
export function containsPacePlaceholders(text: string): boolean {
  return Object.values(PACE_PATTERNS).some(pattern => {
    pattern.lastIndex = 0; // Reset regex state
    return pattern.test(text);
  });
}

/**
 * Gets all pace placeholders found in text
 * @param text - The text to analyze
 * @returns Array of found pace placeholder types
 */
export function findPacePlaceholders(text: string): string[] {
  const found: string[] = [];

  for (const [paceType, pattern] of Object.entries(PACE_PATTERNS)) {
    // Reset the regex lastIndex to avoid issues with global flag
    pattern.lastIndex = 0;
    if (pattern.test(text)) {
      found.push(paceType);
    }
  }

  return found;
}
