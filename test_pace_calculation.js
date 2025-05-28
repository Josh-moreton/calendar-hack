#!/usr/bin/env node

// Simple test to compare the old vs new pace calculations
console.log("Testing Pace Calculation Comparison");
console.log("==================================\n");

// Mock the old calculation (what was happening before)
function calculateOldPaces(raceTimeSeconds, distanceKm, units) {
  // Simplified Jack Daniels calculation (from old system)
  const vdot = 50; // Approximate VDOT for 20:00 5K
  const fiveKPaceSecsPerMile = 29.54 + 5.000663 * vdot - 0.007546 * vdot * vdot;
  const conversionFactor = units === "mi" ? 1.0 : 0.621371;
  const fiveKPace = fiveKPaceSecsPerMile * conversionFactor;

  return {
    easy: fiveKPace * 1.35,
    marathon: fiveKPace * 1.15,
    threshold: fiveKPace * 1.08,
    interval: fiveKPace * 1.0,
  };
}

// Mock the new Pfitzinger calculation (what should happen now)
function calculatePfitzingerPaces(raceTimeSeconds, distanceKm, units) {
  const racePacePerKm = raceTimeSeconds / distanceKm;

  // For 5K input
  const fiveKPace = racePacePerKm;
  const marathonRacePace = racePacePerKm * 1.2;

  const rawEasyPace = marathonRacePace * 1.1;
  const rawMarathonPace = marathonRacePace;
  const rawThresholdPace = fiveKPace * 1.08;
  const rawIntervalPace = fiveKPace;

  // Convert from km to miles if needed
  const conversionFactor = units === "mi" ? 1.609344 : 1.0;

  return {
    easy: rawEasyPace * conversionFactor,
    marathon: rawMarathonPace * conversionFactor,
    threshold: rawThresholdPace * conversionFactor,
    interval: rawIntervalPace * conversionFactor,
  };
}

function formatPace(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// Test with 20:00 5K in miles
const testTime = 20 * 60; // 1200 seconds
const testDistance = 5; // km
const units = "mi";

console.log("Input: 20:00 5K, output in miles per mile");
console.log();

const oldPaces = calculateOldPaces(testTime, testDistance, units);
console.log("OLD SYSTEM (Jack Daniels generic):");
console.log(`  Easy: ${formatPace(oldPaces.easy)}/mi`);
console.log(`  Marathon: ${formatPace(oldPaces.marathon)}/mi`);
console.log(`  Threshold: ${formatPace(oldPaces.threshold)}/mi`);
console.log(`  Interval: ${formatPace(oldPaces.interval)}/mi`);
console.log();

const newPaces = calculatePfitzingerPaces(testTime, testDistance, units);
console.log("NEW SYSTEM (Pfitzinger-specific):");
console.log(`  Easy: ${formatPace(newPaces.easy)}/mi`);
console.log(`  Marathon: ${formatPace(newPaces.marathon)}/mi`);
console.log(`  Threshold: ${formatPace(newPaces.threshold)}/mi`);
console.log(`  Interval: ${formatPace(newPaces.interval)}/mi`);
console.log();

console.log("DIFFERENCES:");
console.log(
  `  Easy: ${formatPace(Math.abs(oldPaces.easy - newPaces.easy))} difference`
);
console.log(
  `  Marathon: ${formatPace(Math.abs(oldPaces.marathon - newPaces.marathon))} difference`
);
console.log(
  `  Threshold: ${formatPace(Math.abs(oldPaces.threshold - newPaces.threshold))} difference`
);
console.log(
  `  Interval: ${formatPace(Math.abs(oldPaces.interval - newPaces.interval))} difference`
);
