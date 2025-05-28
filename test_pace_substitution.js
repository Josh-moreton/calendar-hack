// Test script to debug pace substitution for Pfitzinger plans
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock the ES modules for Node.js testing
const mockPaceSettings = {
  goalTime: "20:00",
  raceDistance: "5K",
  units: "mi",
};

const testText = "Run 5 × 1,000 m @ 5K race pace with recovery";
const planId = "frr_5k_01";

console.log("Testing pace substitution...");
console.log("Original text:", testText);
console.log("Plan ID:", planId);
console.log("Pace settings:", mockPaceSettings);

// Let's first check what patterns are in real Pfitzinger plans
const frr5k01Path = path.join(__dirname, "public/plans/json/frr_5k_01.json");
try {
  const planData = JSON.parse(fs.readFileSync(frr5k01Path, "utf8"));

  console.log("\n=== SEARCHING FOR PACE PATTERNS IN FRR_5K_01 ===");

  const allWorkouts = planData.schedule.flatMap(week => week.workouts);
  const workoutsWithDescriptions = allWorkouts.filter(w => w.description);

  console.log(
    `Total workouts with descriptions: ${workoutsWithDescriptions.length}`
  );

  // Look for any text that contains "@" followed by pace-related words
  const pacePatterns = [];
  workoutsWithDescriptions.forEach((workout, index) => {
    const desc = workout.description;
    const matches = desc.match(/@[^@]*pace[^@]*/gi);
    if (matches) {
      matches.forEach(match => {
        if (!pacePatterns.includes(match)) {
          pacePatterns.push(match);
        }
      });
      console.log(`Workout ${index + 1}: "${workout.title}"`);
      console.log(`  Found patterns: ${matches.join(", ")}`);
    }
  });

  console.log("\n=== ALL UNIQUE PACE PATTERNS FOUND ===");
  pacePatterns.forEach(pattern => console.log(`"${pattern}"`));

  if (pacePatterns.length === 0) {
    console.log(
      "No '@...pace' patterns found. Let's look for other pace-related text:"
    );

    workoutsWithDescriptions.forEach((workout, index) => {
      const desc = workout.description;
      if (
        desc.toLowerCase().includes("race pace") ||
        desc.toLowerCase().includes("@ ")
      ) {
        console.log(`Workout ${index + 1}: "${workout.title}"`);
        console.log(`  Description: ${desc}`);
      }
    });
  }
} catch (error) {
  console.error("Error reading plan file:", error.message);
}
