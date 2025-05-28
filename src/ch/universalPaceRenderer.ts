/**
 * Universal Pace Renderer
 *
 * Handles rendering workouts with the new structured pace system.
 * Supports both legacy text-based pace substitution and new pace segments.
 */

import { PaceSettings, WorkoutWithPaces, PaceSegment } from "../@types/app";
import { getPaceCalculatorForPlan } from "./paceCalculators/calculatorRegistry";
import { substitutePacesEnhanced } from "./paceSubstitutionEnhanced";

interface RenderedPaceSegment {
  zone: string;
  zoneName: string;
  paceValue: string;
  distance?: number;
  description: string;
  intervals?: {
    count: number;
    distance: number;
    units?: string;
    recovery?: string;
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
 * Convert PaceSettings to RaceTime format for calculators
 */
function convertToRaceTime(paceSettings: PaceSettings) {
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
 * Render a single pace segment with calculated pace values
 */
function renderPaceSegment(
  segment: PaceSegment,
  paceSettings: PaceSettings,
  planId: string
): RenderedPaceSegment {
  const calculator = getPaceCalculatorForPlan(planId);
  const raceTime = convertToRaceTime(paceSettings);
  const calculatedPaces = calculator.calculatePaces(
    raceTime,
    paceSettings.units
  );
  const zoneLabels = calculator.zoneLabels;

  // Map pace zones, treating "recovery" as "easy"
  const zoneKey = segment.zone === "recovery" ? "easy" : segment.zone;
  const paceValue = calculatedPaces[zoneKey as keyof typeof calculatedPaces];
  const zoneName =
    zoneLabels[zoneKey as keyof typeof zoneLabels] ||
    zoneLabels.easy ||
    segment.zone;

  return {
    zone: segment.zone,
    zoneName,
    paceValue: formatPace(paceValue),
    distance: segment.distance,
    description: segment.description,
    intervals: segment.intervals,
  };
}

/**
 * Render a workout with structured pace information
 */
export function renderWorkoutWithPaces(
  workout: WorkoutWithPaces,
  paceSettings: PaceSettings | null,
  planId: string
): { title: string; description: string; paceDetails?: RenderedPaceSegment[] } {
  // Start with basic rendering (handles distance conversions)
  let title = workout.title;
  let description = workout.description || "";

  // If no pace settings, return basic rendering
  if (!paceSettings) {
    return { title, description };
  }

  // If workout has structured paces, use the new system
  if (workout.paces && workout.paces.length > 0) {
    const paceDetails = workout.paces.map(segment =>
      renderPaceSegment(segment, paceSettings, planId)
    );

    // Build enhanced description with pace information
    let enhancedDescription = description;

    if (paceDetails.length > 0) {
      enhancedDescription += "\n\nPace Guide:";
      paceDetails.forEach(detail => {
        if (detail.intervals) {
          enhancedDescription += `\n• ${detail.description}: ${detail.paceValue} (${detail.zoneName})`;
          enhancedDescription += `\n  ${detail.intervals.count} × ${detail.intervals.distance}${detail.intervals.units || "m"}`;
          if (detail.intervals.recovery) {
            enhancedDescription += ` - ${detail.intervals.recovery}`;
          }
        } else {
          const distanceText = detail.distance
            ? ` (${detail.distance} ${paceSettings.units})`
            : "";
          enhancedDescription += `\n• ${detail.description}${distanceText}: ${detail.paceValue} (${detail.zoneName})`;
        }
      });
    }

    return {
      title,
      description: enhancedDescription,
      paceDetails,
    };
  }

  // Fallback: use legacy text-based pace substitution
  title = substitutePacesEnhanced(title, paceSettings, planId);
  description = substitutePacesEnhanced(description, paceSettings, planId);

  return { title, description };
}

/**
 * Check if a workout uses the new pace structure
 */
export function workoutHasStructuredPaces(workout: WorkoutWithPaces): boolean {
  return !!(workout.paces && workout.paces.length > 0);
}

/**
 * Get a summary of pace zones used in a workout
 */
export function getWorkoutPaceZones(workout: WorkoutWithPaces): string[] {
  if (!workout.paces) return [];
  return [...new Set(workout.paces.map(p => p.zone))];
}

/**
 * Calculate total distance for structured pace segments
 */
export function calculatePaceSegmentDistance(segments: PaceSegment[]): number {
  return segments.reduce((total, segment) => {
    if (segment.distance) {
      return total + segment.distance;
    }
    if (segment.intervals) {
      // Rough estimate for interval distance
      return (
        total + (segment.intervals.count * segment.intervals.distance) / 1600
      ); // Convert meters to miles
    }
    return total;
  }, 0);
}
