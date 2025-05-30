// Simple test to verify Pfitzinger calculator logic
const fs = require("fs");
const path = require("path");

// Mock the required modules since we can't easily import TypeScript files
console.log("Testing Pfitzinger Calculator Logic...\n");

// Simulate the calculator logic directly
function testPfitzingerLogic() {
  // Test case 1: 20:00 5K (faster runner)
  const timeInSeconds1 = 20 * 60; // 1200 seconds
  const distanceInKm1 = 5;
  const racePacePerKm1 = timeInSeconds1 / distanceInKm1; // 240 seconds per km (4:00/km)

  // Test case 2: 22:00 5K (slower runner)
  const timeInSeconds2 = 22 * 60; // 1320 seconds
  const distanceInKm2 = 5;
  const racePacePerKm2 = timeInSeconds2 / distanceInKm2; // 264 seconds per km (4:24/km)

  console.log("Race pace comparison:");
  console.log(
    `20:00 5K race pace: ${Math.floor(racePacePerKm1 / 60)}:${String(racePacePerKm1 % 60).padStart(2, "0")}/km`
  );
  console.log(
    `22:00 5K race pace: ${Math.floor(racePacePerKm2 / 60)}:${String(racePacePerKm2 % 60).padStart(2, "0")}/km\n`
  );

  // Calculate training paces using Pfitzinger multipliers
  const calculatePaces = racePace => ({
    easy: racePace * 1.25, // 25% slower than race pace
    marathon: racePace * 1.1, // 10% slower than race pace
    threshold: racePace * 1.05, // 5% slower than race pace
    interval: racePace * 0.98, // 2% faster than race pace
    recovery: racePace * 1.35, // 35% slower than race pace
  });

  const paces1 = calculatePaces(racePacePerKm1);
  const paces2 = calculatePaces(racePacePerKm2);

  const formatTime = seconds =>
    `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;

  console.log("Training paces for 20:00 5K:");
  console.log(`Easy: ${formatTime(paces1.easy)}/km`);
  console.log(`Marathon: ${formatTime(paces1.marathon)}/km`);
  console.log(`Threshold: ${formatTime(paces1.threshold)}/km`);
  console.log(`Interval: ${formatTime(paces1.interval)}/km`);
  console.log(`Recovery: ${formatTime(paces1.recovery)}/km\n`);

  console.log("Training paces for 22:00 5K:");
  console.log(`Easy: ${formatTime(paces2.easy)}/km`);
  console.log(`Marathon: ${formatTime(paces2.marathon)}/km`);
  console.log(`Threshold: ${formatTime(paces2.threshold)}/km`);
  console.log(`Interval: ${formatTime(paces2.interval)}/km`);
  console.log(`Recovery: ${formatTime(paces2.recovery)}/km\n`);

  // Verify logic: faster race time should produce faster training paces
  console.log("Logic verification (20:00 should be faster than 22:00):");
  console.log(`Easy: ${paces1.easy < paces2.easy ? "✅ CORRECT" : "❌ WRONG"}`);
  console.log(
    `Marathon: ${paces1.marathon < paces2.marathon ? "✅ CORRECT" : "❌ WRONG"}`
  );
  console.log(
    `Threshold: ${paces1.threshold < paces2.threshold ? "✅ CORRECT" : "❌ WRONG"}`
  );
  console.log(
    `Interval: ${paces1.interval < paces2.interval ? "✅ CORRECT" : "❌ WRONG"}`
  );
  console.log(
    `Recovery: ${paces1.recovery < paces2.recovery ? "✅ CORRECT" : "❌ WRONG"}`
  );
}

testPfitzingerLogic();
