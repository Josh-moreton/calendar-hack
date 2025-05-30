#!/usr/bin/env node

// Test the enhanced pace substitution system
const fs = require("fs");
const path = require("path");

// Mock the pace calculation modules
const paceCalculators = {
  pfitzingerCalculator: {
    calculatePaces: baseSeconds => ({
      LT: "6:45",
      MP: "7:00",
      E: "8:00",
      R: "5:30",
      I: "6:00",
    }),
  },
  hansonsCalculator: {
    calculatePaces: baseSeconds => ({
      EP: "8:15",
      MP: "7:05",
      HMP: "6:50",
      TP: "6:30",
      SP: "5:45",
    }),
  },
  higdonCalculator: {
    calculatePaces: baseSeconds => ({
      easy: "8:30",
      moderate: "7:30",
      "comfortably hard": "6:45",
      hard: "6:15",
    }),
  },
  danielsCalculator: {
    calculatePaces: baseSeconds => ({
      E: "8:10",
      M: "7:10",
      T: "6:40",
      I: "6:00",
      R: "5:20",
    }),
  },
};

// Mock the enhanced pace substitution
function enhancedPaceSubstitution(desc, baseSeconds, planId) {
  // Provider detection based on plan ID patterns
  let calculator;
  if (planId && planId.includes("pfitz")) {
    calculator = paceCalculators.pfitzingerCalculator;
  } else if (planId && planId.includes("hanson")) {
    calculator = paceCalculators.hansonsCalculator;
  } else if (planId && planId.includes("higdon")) {
    calculator = paceCalculators.higdonCalculator;
  } else if (planId && planId.includes("daniel")) {
    calculator = paceCalculators.danielsCalculator;
  } else {
    // Default to Pfitzinger
    calculator = paceCalculators.pfitzingerCalculator;
  }

  const paces = calculator.calculatePaces(baseSeconds);

  // Simple substitution - replace pace terms with calculated values
  let result = desc;
  for (const [term, pace] of Object.entries(paces)) {
    result = result.replace(new RegExp(term, "gi"), pace);
  }

  return result;
}

// Test cases
const testCases = [
  {
    planId: "pfitz_18_55",
    desc: "LT run at LT pace for 30 minutes",
    expected: "should replace LT with Pfitzinger LT pace",
  },
  {
    planId: "hanson_advanced",
    desc: "Easy run at EP pace",
    expected: "should replace EP with Hansons easy pace",
  },
  {
    planId: "higdon_intermediate_1",
    desc: "Run easy pace for 45 minutes",
    expected: "should replace easy with Higdon easy pace",
  },
  {
    planId: "daniels_2q_marathon",
    desc: "Tempo run at T pace",
    expected: "should replace T with Daniels tempo pace",
  },
  {
    planId: null,
    desc: "LT run without plan ID",
    expected: "should default to Pfitzinger",
  },
];

console.log("Testing Enhanced Pace Substitution System");
console.log("==========================================\n");

let baseSeconds = 420; // 7:00 minute mile base pace

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.expected}`);
  console.log(`Plan ID: ${testCase.planId || "null"}`);
  console.log(`Input: ${testCase.desc}`);

  const result = enhancedPaceSubstitution(
    testCase.desc,
    baseSeconds,
    testCase.planId
  );
  console.log(`Output: ${result}`);
  console.log("---");
});

console.log("\nThe enhanced pace substitution system should now:");
console.log("1. Automatically detect provider from plan ID");
console.log("2. Use provider-specific pace calculations");
console.log("3. Apply appropriate pace substitutions");
console.log("4. Work with iCal, CSV, and calendar rendering");
