#!/usr/bin/env node

/**
 * Plan Migration Tool
 *
 * Converts existing training plans from text-based pace patterns
 * to the new universal pace structure.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping from text patterns to universal pace zones
const PACE_PATTERN_MAPPINGS = {
  // Pfitzinger patterns
  "@ 5K race pace": { zone: "interval", description: "VO₂max effort" },
  "@ 3K-5K race pace": { zone: "interval", description: "VO₂max effort" },
  "@ marathon race pace": {
    zone: "marathon",
    description: "marathon race pace",
  },
  "@ 15K to half marathon race pace": {
    zone: "threshold",
    description: "lactate threshold effort",
  },
  "@ 15K to half marathon pace": {
    zone: "threshold",
    description: "lactate threshold effort",
  },
  "@ 800 m to mile race pace": {
    zone: "repetition",
    description: "neuromuscular power",
  },

  // Generic patterns
  "@easy@": { zone: "easy", description: "easy pace" },
  "@mp@": { zone: "marathon", description: "marathon pace" },
  "@marathon@": { zone: "marathon", description: "marathon pace" },
  "@tempo@": { zone: "threshold", description: "tempo pace" },
  "@threshold@": { zone: "threshold", description: "threshold pace" },
  "@interval@": { zone: "interval", description: "interval pace" },
  "@5k@": { zone: "interval", description: "5K pace" },
  "@rep@": { zone: "repetition", description: "repetition pace" },
  "@repetition@": { zone: "repetition", description: "repetition pace" },
};

/**
 * Analyze a workout title/description for pace patterns
 */
function analyzePacePatterns(text) {
  const found = [];

  for (const [pattern, paceInfo] of Object.entries(PACE_PATTERN_MAPPINGS)) {
    const regex = new RegExp(
      pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "gi"
    );
    if (regex.test(text)) {
      found.push({
        pattern,
        ...paceInfo,
        originalText: text.match(regex)?.[0] || pattern,
      });
    }
  }

  return found;
}

/**
 * Extract interval information from workout descriptions
 */
function extractIntervalInfo(description) {
  // Look for patterns like "5 × 800m", "4 x 400m", "6 × 1,000 m"
  const intervalPattern = /(\d+)\s*[×x]\s*(\d+(?:,\d+)?)\s*(m|km|mi|yd)/gi;
  const matches = [...description.matchAll(intervalPattern)];

  if (matches.length > 0) {
    const match = matches[0];
    return {
      count: parseInt(match[1]),
      distance: parseFloat(match[2].replace(",", "")),
      units: match[3],
    };
  }

  return null;
}

/**
 * Convert a workout to the new pace structure
 */
function convertWorkoutToPaceStructure(workout) {
  if (!workout.title && !workout.description) {
    return workout; // No conversion needed for rest days
  }

  const text = `${workout.title || ""} ${workout.description || ""}`;
  const pacePatterns = analyzePacePatterns(text);

  if (pacePatterns.length === 0) {
    return workout; // No pace patterns found
  }

  // Create new workout structure
  const convertedWorkout = {
    ...workout,
    paces: [],
  };

  // Simple conversion - assume equal split for multiple pace zones
  const totalDistance = workout.distance || 0;

  if (pacePatterns.length === 1) {
    const pattern = pacePatterns[0];
    const intervals = extractIntervalInfo(text);

    if (intervals) {
      // Interval workout
      convertedWorkout.paces = [
        {
          zone: "easy",
          distance: totalDistance * 0.3,
          description: "warm-up",
        },
        {
          zone: pattern.zone,
          description: pattern.description,
          intervals,
        },
        {
          zone: "easy",
          distance: totalDistance * 0.3,
          description: "cool-down",
        },
      ];
    } else {
      // Sustained pace workout
      convertedWorkout.paces = [
        {
          zone: "easy",
          distance: totalDistance * 0.2,
          description: "warm-up",
        },
        {
          zone: pattern.zone,
          distance: totalDistance * 0.6,
          description: pattern.description,
        },
        {
          zone: "easy",
          distance: totalDistance * 0.2,
          description: "cool-down",
        },
      ];
    }
  } else {
    // Multiple pace zones - more complex logic needed
    convertedWorkout.paces = pacePatterns.map(pattern => ({
      zone: pattern.zone,
      distance: totalDistance / pacePatterns.length,
      description: pattern.description,
    }));
  }

  return convertedWorkout;
}

/**
 * Main conversion function
 */
function convertPlan(planPath) {
  console.log(`Converting plan: ${planPath}`);

  const planData = JSON.parse(fs.readFileSync(planPath, "utf8"));
  const convertedPlan = {
    ...planData,
    schedule: planData.schedule.map(week => ({
      ...week,
      workouts: week.workouts.map(workout =>
        convertWorkoutToPaceStructure(workout)
      ),
    })),
  };

  // Count conversions
  let totalWorkouts = 0;
  let convertedWorkouts = 0;

  convertedPlan.schedule.forEach(week => {
    week.workouts.forEach(workout => {
      totalWorkouts++;
      if (workout.paces && workout.paces.length > 0) {
        convertedWorkouts++;
      }
    });
  });

  console.log(`  Total workouts: ${totalWorkouts}`);
  console.log(`  Converted workouts: ${convertedWorkouts}`);
  console.log(
    `  Conversion rate: ${((convertedWorkouts / totalWorkouts) * 100).toFixed(1)}%`
  );

  return convertedPlan;
}

// CLI usage
if (process.argv.length < 3) {
  console.log("Usage: node convertPlans.js <plan-file.json>");
  console.log("Example: node convertPlans.js public/plans/json/frr_5k_01.json");
  process.exit(1);
}

const planFile = process.argv[2];
const outputFile = planFile.replace(".json", "_with_paces.json");

try {
  const convertedPlan = convertPlan(planFile);
  fs.writeFileSync(outputFile, JSON.stringify(convertedPlan, null, 2));
  console.log(`\nConverted plan saved to: ${outputFile}`);
  console.log(
    "\nTo test the conversion, compare the original and converted files."
  );
} catch (error) {
  console.error("Error converting plan:", error.message);
  process.exit(1);
}
