// Test the enhanced pace substitution with real Pfitzinger patterns
import { substitutePacesEnhanced } from "./src/ch/paceSubstitutionEnhanced.js";

const mockPaceSettings = {
  goalTime: "20:00",
  raceDistance: "5K",
  units: "mi",
};

const testTexts = [
  "Run 5 × 1,000 m @ 5K race pace with recovery",
  "Run 6 × 1,000 m @ 3K-5K race pace with recovery",
  "Run 4 × 300 m @ 800 m to mile race pace with recovery",
  "Easy run @easy@ for recovery",
];

const planId = "frr_5k_01";

console.log("Testing enhanced pace substitution...");
console.log("Pace settings:", mockPaceSettings);
console.log("Plan ID:", planId);
console.log("=".repeat(50));

testTexts.forEach((text, index) => {
  console.log(`\nTest ${index + 1}:`);
  console.log(`Original: ${text}`);
  try {
    const result = substitutePacesEnhanced(text, mockPaceSettings, planId);
    console.log(`Result:   ${result}`);
    console.log(`Changed:  ${text !== result ? "YES" : "NO"}`);
  } catch (error) {
    console.log(`Error:    ${error.message}`);
  }
});
