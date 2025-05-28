/**
 * Advanced Pace Calculator for Running Training Plans
 * 
 * This calculator uses established physiological relationships between race times
 * to determine appropriate training paces for different workout types.
 * 
 * Based on methods from:
 * - Jack Daniels' "Daniels' Running Formula"
 * - Pete Pfitzinger's training methodologies
 * - McMillan Running Calculator principles
 */

import { Units } from 'types/app';

// Race distances in meters
export const RACE_DISTANCES = {
  '800m': 800,
  '1500m': 1500,
  'mile': 1609.344,
  '3K': 3000,
  '5K': 5000,
  '8K': 8000,
  '10K': 10000,
  '15K': 15000,
  '10M': 16093.44,
  'half': 21097.5,
  'marathon': 42195
} as const;

export type RaceDistance = keyof typeof RACE_DISTANCES;

// Time in seconds for easy conversion
export interface RaceTime {
  distance: RaceDistance;
  timeInSeconds: number;
}

export interface PaceZones {
  easy: number;          // Easy/Recovery pace (seconds per unit)
  marathon: number;      // Marathon pace (seconds per unit)
  threshold: number;     // Lactate Threshold pace (seconds per unit)
  interval: number;      // VO2max/5K pace (seconds per unit)
  recovery: number;      // Recovery/Neuromuscular power pace (seconds per unit)
  long: number;          // Long run pace (seconds per unit)
}

/**
 * Convert time string (MM:SS or HH:MM:SS) to seconds
 */
export function parseTimeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]; // MM:SS
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
  }
  throw new Error('Invalid time format. Use MM:SS or HH:MM:SS');
}

/**
 * Convert seconds to time string (MM:SS or HH:MM:SS)
 */
export function formatSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate VDOT (VO2max approximation) from race performance
 * Based on Jack Daniels' formula
 */
export function calculateVDOT(raceTime: RaceTime): number {
  const { distance, timeInSeconds } = raceTime;
  const distanceInMeters = RACE_DISTANCES[distance];
  
  // Calculate velocity in meters per minute
  const velocityMPerMin = distanceInMeters / (timeInSeconds / 60);
  
  // Jack Daniels' VDOT calculation
  // Simplified but more accurate approach
  let percentageVO2Max: number;
  
  // Percentage of VO2max sustained for different distances (Daniels' data)
  if (distance === 'marathon') {
    percentageVO2Max = 79;  // 79%
  } else if (distance === 'half') {
    percentageVO2Max = 85; // 85%
  } else if (distance === '10M' || distance === '15K') {
    percentageVO2Max = 89; // 89%
  } else if (distance === '10K') {
    percentageVO2Max = 93; // 93%
  } else if (distance === '8K') {
    percentageVO2Max = 95; // 95%
  } else if (distance === '5K') {
    percentageVO2Max = 98; // 98%
  } else if (distance === '3K') {
    percentageVO2Max = 100;  // 100%
  } else if (distance === '1500m' || distance === 'mile') {
    percentageVO2Max = 102; // 102%
  } else {
    percentageVO2Max = 95; // default
  }
  
  // Calculate VDOT using a more conservative formula
  // Based on the relationship between velocity and VO2max
  const vdot = (velocityMPerMin * 100) / percentageVO2Max * 0.15;
  
  return Math.max(30, Math.min(85, vdot)); // Clamp between reasonable bounds
}

/**
 * Calculate training pace zones based on VDOT
 */
export function calculatePaceZones(vdot: number, units: Units): PaceZones {
  // Jack Daniels' pace calculations - more accurate implementation
  // Calculate 5K pace first (approximately 98% of VDOT)
  const fiveKPaceSecsPerMile = 29.54 + 5.000663 * vdot - 0.007546 * vdot * vdot;
  
  // Convert to desired units
  const conversionFactor = units === 'mi' ? 1.0 : 0.621371; // mile to km conversion
  const fiveKPace = fiveKPaceSecsPerMile * conversionFactor;
  
  // Training pace zones based on Jack Daniels' methodology (relative to 5K pace)
  return {
    easy: fiveKPace * 1.35,       // Easy: 35% slower than 5K pace
    marathon: fiveKPace * 1.15,   // Marathon: 15% slower than 5K pace  
    threshold: fiveKPace * 1.08,  // Threshold: 8% slower than 5K pace
    interval: fiveKPace * 1.0,    // Interval: 5K pace
    recovery: fiveKPace * 0.95,   // Recovery: 5% faster than 5K pace
    long: fiveKPace * 1.4,        // Long run: 40% slower than 5K pace
  };
}

/**
 * Calculate all training paces from a race time
 */
export function calculateTrainingPaces(raceTime: RaceTime, units: Units): PaceZones {
  const vdot = calculateVDOT(raceTime);
  return calculatePaceZones(vdot, units);
}

/**
 * Format pace as MM:SS per unit
 */
export function formatPace(paceInSeconds: number): string {
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get pace for specific training zone by name
 */
export function getPaceByZone(paces: PaceZones, zone: string): number | null {
  const normalizedZone = zone.toLowerCase().trim();
  
  if (normalizedZone.includes('easy') || normalizedZone.includes('recovery')) {
    return paces.easy;
  }
  if (normalizedZone.includes('threshold') || normalizedZone.includes('lt') || normalizedZone.includes('tempo')) {
    return paces.threshold;
  }
  if (normalizedZone.includes('marathon') || normalizedZone.includes('mp')) {
    return paces.marathon;
  }
  if (normalizedZone.includes('interval') || normalizedZone.includes('vo2') || normalizedZone.includes('5k')) {
    return paces.interval;
  }
  if (normalizedZone.includes('repetition') || normalizedZone.includes('rep') || normalizedZone.includes('mile') || normalizedZone.includes('800')) {
    return paces.recovery;
  }
  
  return null;
}

/**
 * Parse pace range (e.g., "7:30-8:00") and return average
 */
export function parsePaceRange(paceStr: string): number | null {
  const rangeMatch = paceStr.match(/(\d+):(\d+)-(\d+):(\d+)/);
  if (rangeMatch) {
    const [, min1, sec1, min2, sec2] = rangeMatch;
    const pace1 = parseInt(min1) * 60 + parseInt(sec1);
    const pace2 = parseInt(min2) * 60 + parseInt(sec2);
    return (pace1 + pace2) / 2;
  }
  
  const singleMatch = paceStr.match(/(\d+):(\d+)/);
  if (singleMatch) {
    const [, min, sec] = singleMatch;
    return parseInt(min) * 60 + parseInt(sec);
  }
  
  return null;
}

/**
 * Predict race time for given distance based on current fitness (VDOT)
 */
export function predictRaceTime(vdot: number, targetDistance: RaceDistance): number {
  const distanceInMeters = RACE_DISTANCES[targetDistance];
  
  // Simplified prediction based on VDOT
  const baseVelocity = (vdot * 0.8 + 3.5) / 3.6; // m/s
  
  // Adjust velocity based on distance (longer distances = slower relative pace)
  let adjustmentFactor: number;
  if (distanceInMeters <= 1609) adjustmentFactor = 1.12; // Mile and shorter
  else if (distanceInMeters <= 5000) adjustmentFactor = 1.02; // 5K
  else if (distanceInMeters <= 10000) adjustmentFactor = 0.98; // 10K
  else if (distanceInMeters <= 21097) adjustmentFactor = 0.92; // Half marathon
  else adjustmentFactor = 0.88; // Marathon
  
  const raceVelocity = baseVelocity * adjustmentFactor;
  return distanceInMeters / raceVelocity;
}