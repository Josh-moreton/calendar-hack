/**
 * Test script to verify that each pace calculator returns provider-specific labels
 */

// Import the calculator registry
import { getPaceCalculatorForPlan } from "./src/ch/paceCalculators/calculatorRegistry.ts";

// Test data: 20:00 5K time
const testRaceTime = {
  distance: "5K",
  timeInSeconds: 20 * 60, // 20 minutes
};

const units = "mi";

// Test each provider
const testCases = [
  { planId: "frr_5k_01", expectedCalculator: "Pfitzinger" },
  { planId: "hansons_marathon_01", expectedCalculator: "Hansons" },
  { planId: "higdon_marathon_01", expectedCalculator: "Higdon" },
  { planId: "daniels_5k_01", expectedCalculator: "Daniels" },
];

console.log("Testing Provider-Specific Pace Zone Labels");
console.log("==========================================");

testCases.forEach(testCase => {
  try {
    const calculator = getPaceCalculatorForPlan(testCase.planId);
    const paces = calculator.calculatePaces(testRaceTime, units);

    console.log(
      `\n${testCase.expectedCalculator} Calculator (${testCase.planId}):`
    );
    console.log(`  Calculator Name: ${calculator.name}`);
    console.log(`  Zone Labels:`);
    console.log(`    Easy: "${calculator.zoneLabels.easy}"`);
    console.log(`    Marathon: "${calculator.zoneLabels.marathon}"`);
    console.log(`    Threshold: "${calculator.zoneLabels.threshold}"`);
    console.log(`    Interval: "${calculator.zoneLabels.interval}"`);
    if (calculator.zoneLabels.repetition) {
      console.log(`    Repetition: "${calculator.zoneLabels.repetition}"`);
    }

    console.log(`  Sample Paces:`);
    console.log(
      `    ${calculator.zoneLabels.easy}: ${Math.floor(paces.easy / 60)}:${String(Math.round(paces.easy % 60)).padStart(2, "0")}`
    );
    console.log(
      `    ${calculator.zoneLabels.marathon}: ${Math.floor(paces.marathon / 60)}:${String(Math.round(paces.marathon % 60)).padStart(2, "0")}`
    );
    console.log(
      `    ${calculator.zoneLabels.threshold}: ${Math.floor(paces.threshold / 60)}:${String(Math.round(paces.threshold % 60)).padStart(2, "0")}`
    );
    console.log(
      `    ${calculator.zoneLabels.interval}: ${Math.floor(paces.interval / 60)}:${String(Math.round(paces.interval % 60)).padStart(2, "0")}`
    );
  } catch (error) {
    console.error(`Error testing ${testCase.planId}:`, error.message);
  }
});
