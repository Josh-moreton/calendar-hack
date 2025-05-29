const {
  PfitzingerPaceCalculator,
} = require("./src/ch/paceCalculators/pfitzingerCalculator.ts");

console.log("Testing Pfitzinger Calculator...");

const calculator = new PfitzingerPaceCalculator();

// Test case 1: 20:00 5K
const raceTime1 = { distance: "5K", timeInSeconds: 20 * 60 }; // 20:00
const paces1 = calculator.calculatePaces(raceTime1, "km");

console.log("\n20:00 5K results:");
console.log("Easy:", paces1.easy, "seconds per km");
console.log("Marathon:", paces1.marathon, "seconds per km");
console.log("Threshold:", paces1.threshold, "seconds per km");
console.log("Interval:", paces1.interval, "seconds per km");
console.log("Recovery:", paces1.repetition, "seconds per km");

// Test case 2: 22:00 5K
const raceTime2 = { distance: "5K", timeInSeconds: 22 * 60 }; // 22:00
const paces2 = calculator.calculatePaces(raceTime2, "km");

console.log("\n22:00 5K results:");
console.log("Easy:", paces2.easy, "seconds per km");
console.log("Marathon:", paces2.marathon, "seconds per km");
console.log("Threshold:", paces2.threshold, "seconds per km");
console.log("Interval:", paces2.interval, "seconds per km");
console.log("Recovery:", paces2.repetition, "seconds per km");

console.log("\nVerification (faster 5K should produce faster training paces):");
console.log(
  "20:00 Easy vs 22:00 Easy:",
  paces1.easy < paces2.easy ? "CORRECT" : "WRONG"
);
console.log(
  "20:00 Marathon vs 22:00 Marathon:",
  paces1.marathon < paces2.marathon ? "CORRECT" : "WRONG"
);
console.log(
  "20:00 Threshold vs 22:00 Threshold:",
  paces1.threshold < paces2.threshold ? "CORRECT" : "WRONG"
);
console.log(
  "20:00 Interval vs 22:00 Interval:",
  paces1.interval < paces2.interval ? "CORRECT" : "WRONG"
);
