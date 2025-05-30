import { PfitzingerPaceCalculator } from "./src/ch/paceCalculators/pfitzingerCalculator";
import { RaceTime } from "./src/ch/paceCalculators/baseCalculator";

// Test the Pfitzinger calculator with a 20-minute 5K
const calculator = new PfitzingerPaceCalculator();

const testRaceTime: RaceTime = {
  distance: "5K",
  timeInSeconds: 20 * 60, // 20 minutes = 1200 seconds
};

console.log("Testing Pfitzinger Calculator");
console.log("=============================");
console.log(
  `Input: ${testRaceTime.distance} in ${testRaceTime.timeInSeconds / 60} minutes`
);
console.log(
  `Race pace: ${(testRaceTime.timeInSeconds / 5 / 60).toFixed(2)} min/km`
);
console.log();

// Test with metric units
console.log("Metric Results (min:sec per km):");
const metricPaces = calculator.calculatePaces(testRaceTime, "km");
console.log(
  `Recovery:  ${Math.floor(metricPaces.repetition / 60)}:${String(Math.round(metricPaces.repetition % 60)).padStart(2, "0")}`
);
console.log(
  `Easy:      ${Math.floor(metricPaces.easy / 60)}:${String(Math.round(metricPaces.easy % 60)).padStart(2, "0")}`
);
console.log(
  `Marathon:  ${Math.floor(metricPaces.marathon / 60)}:${String(Math.round(metricPaces.marathon % 60)).padStart(2, "0")}`
);
console.log(
  `Threshold: ${Math.floor(metricPaces.threshold / 60)}:${String(Math.round(metricPaces.threshold % 60)).padStart(2, "0")}`
);
console.log(
  `Interval:  ${Math.floor(metricPaces.interval / 60)}:${String(Math.round(metricPaces.interval % 60)).padStart(2, "0")}`
);
console.log();

// Test with imperial units
console.log("Imperial Results (min:sec per mile):");
const imperialPaces = calculator.calculatePaces(testRaceTime, "mi");
console.log(
  `Recovery:  ${Math.floor(imperialPaces.repetition / 60)}:${String(Math.round(imperialPaces.repetition % 60)).padStart(2, "0")}`
);
console.log(
  `Easy:      ${Math.floor(imperialPaces.easy / 60)}:${String(Math.round(imperialPaces.easy % 60)).padStart(2, "0")}`
);
console.log(
  `Marathon:  ${Math.floor(imperialPaces.marathon / 60)}:${String(Math.round(imperialPaces.marathon % 60)).padStart(2, "0")}`
);
console.log(
  `Threshold: ${Math.floor(imperialPaces.threshold / 60)}:${String(Math.round(imperialPaces.threshold % 60)).padStart(2, "0")}`
);
console.log(
  `Interval:  ${Math.floor(imperialPaces.interval / 60)}:${String(Math.round(imperialPaces.interval % 60)).padStart(2, "0")}`
);

// Expected results for validation (approximate)
console.log();
console.log("Expected ranges for 20min 5K runner:");
console.log("Recovery: 5:30-6:00 per km (8:50-9:40 per mile)");
console.log("Easy: 5:00-5:30 per km (8:00-8:50 per mile)");
console.log("Marathon: 4:30-5:00 per km (7:15-8:00 per mile)");
console.log("Threshold: 4:15-4:30 per km (6:50-7:15 per mile)");
console.log("Interval: 4:00 per km (6:26 per mile)");
