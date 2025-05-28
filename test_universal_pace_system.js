// Test the new universal pace system
// import { renderWorkoutWithPaces, workoutHasStructuredPaces } from './src/ch/universalPaceRenderer.js';

console.log("=== UNIVERSAL PACE SYSTEM DEMONSTRATION ===");

// Mock workout with structured paces (Pfitzinger VO2max workout)
const sampleWorkout = {
  title: "VO₂max intervals",
  description:
    "Warm up easy, then interval training at VO₂max effort with jog recovery",
  distance: 8.0,
  tags: ["Speedwork"],
  units: "mi",
  paces: [
    {
      zone: "easy",
      distance: 2.5,
      description: "warm-up",
    },
    {
      zone: "interval",
      description: "5 × 800m intervals",
      intervals: {
        count: 5,
        distance: 800,
        units: "m",
        recovery: "jog 50-90% interval time between",
      },
    },
    {
      zone: "easy",
      distance: 2.5,
      description: "cool-down",
    },
  ],
};

// Mock pace settings (20:00 5K runner)
const paceSettings = {
  goalTime: "20:00",
  raceDistance: "5K",
  units: "mi",
};

const planId = "frr_5k_01"; // Pfitzinger plan

console.log("=== TESTING UNIVERSAL PACE SYSTEM ===");
console.log("\nSample workout:");
console.log("Title:", sampleWorkout.title);
console.log("Original description:", sampleWorkout.description);

// Simple check for structured paces (since we can't import the function yet)
const hasStructuredPaces = !!(
  sampleWorkout.paces && sampleWorkout.paces.length > 0
);
console.log("Has structured paces:", hasStructuredPaces);

console.log("\nPace settings:");
console.log("Race:", paceSettings.raceDistance, "in", paceSettings.goalTime);
console.log("Units:", paceSettings.units);
console.log("Plan ID:", planId);

console.log("\n=== EXPECTED BEHAVIOR ===");
console.log("1. Should detect Pfitzinger plan from ID");
console.log("2. Should calculate paces using Pfitzinger formulas");
console.log("3. Should use Pfitzinger terminology:");
console.log("   - easy → 'General Aerobic (GA)'");
console.log("   - interval → 'VO₂max'");
console.log("4. Should generate enhanced description with pace guide");

console.log("\n=== PACE ZONE BREAKDOWN ===");
sampleWorkout.paces.forEach((segment, index) => {
  console.log(`Segment ${index + 1}: ${segment.zone}`);
  console.log(`  Description: ${segment.description}`);
  if (segment.distance) {
    console.log(`  Distance: ${segment.distance} mi`);
  }
  if (segment.intervals) {
    console.log(
      `  Intervals: ${segment.intervals.count} × ${segment.intervals.distance}${segment.intervals.units}`
    );
    console.log(`  Recovery: ${segment.intervals.recovery}`);
  }
});

console.log("\n=== FOR A 20:00 5K RUNNER (6:26/mile) ===");
console.log("Expected Pfitzinger paces:");
console.log("- General Aerobic (GA): ~7:30/mile");
console.log("- VO₂max: ~6:00/mile (same as 5K race pace)");

console.log("\n=== BENEFITS OF NEW SYSTEM ===");
console.log("✓ Clean separation of pace logic from descriptive text");
console.log("✓ Structured data for intervals, recovery, etc.");
console.log("✓ Provider-specific terminology automatically applied");
console.log("✓ No regex pattern matching required");
console.log("✓ Easy to extend with new pace zones");
console.log("✓ Rich metadata for workout analysis");

// Test rendering (would need to import actual modules in real environment)
try {
  // const result = renderWorkoutWithPaces(sampleWorkout, paceSettings, planId);
  // console.log("\n=== RENDERED RESULT ===");
  // console.log("Title:", result.title);
  // console.log("Description:", result.description);
  console.log("\n=== SIMULATION ===");
  console.log("Title: VO₂max intervals");
  console.log(
    "Description: Warm up easy, then interval training at VO₂max effort with jog recovery"
  );
  console.log("");
  console.log("Pace Guide:");
  console.log("• warm-up (2.5 mi): 7:30 (General Aerobic (GA))");
  console.log("• 5 × 800m intervals: 6:00 (VO₂max)");
  console.log("  5 × 800m - jog 50-90% interval time between");
  console.log("• cool-down (2.5 mi): 7:30 (General Aerobic (GA))");
} catch (error) {
  console.log(
    "\nNote: This is a simulation - actual rendering would require compiled modules"
  );
}
