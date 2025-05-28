const fs = require("fs");
const path = require("path");

// List of all Pfitzinger plan files
const pfitzFiles = [
  "public/plans/json/pfitz_half_12_100.json",
  "public/plans/json/pfitz_55_recovery.json",
  "public/plans/json/pfitz_18_55.json",
  "public/plans/json/pfitz_18_107.json",
  "public/plans/json/pfitz_half_12_63.json",
  "public/plans/json/pfitz_12_70.json",
  "public/plans/json/pfitz_18_85.json",
  "public/plans/json/pfitz_18_70.json",
  "public/plans/json/pfitz_12_55.json",
  "public/plans/json/pfitz_half_12_47.json",
  "public/plans/json/pfitz_half_12_84.json",
  "public/plans/json/pfitz_multi_4.json",
];

const allRunTypes = new Set();
const runTypesByFile = {};

console.log("=== EXTRACTING RUN TYPES FROM ALL PFITZINGER PLANS ===\n");

pfitzFiles.forEach(filePath => {
  try {
    const fullPath = path.join(
      "/Users/joshua.moreton/Documents/GitHub/calendar-hack",
      filePath
    );
    const content = fs.readFileSync(fullPath, "utf8");
    const plan = JSON.parse(content);

    const fileRunTypes = new Set();

    // Extract run types from weeks
    if (plan.weeks) {
      plan.weeks.forEach(week => {
        if (week.workouts) {
          week.workouts.forEach(workout => {
            if (workout.type) {
              allRunTypes.add(workout.type);
              fileRunTypes.add(workout.type);
            }
          });
        }
      });
    }

    runTypesByFile[filePath] = Array.from(fileRunTypes).sort();
    console.log(`${path.basename(filePath)}:`);
    console.log(`  Run types: ${Array.from(fileRunTypes).sort().join(", ")}`);
    console.log(`  Total unique: ${fileRunTypes.size}\n`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log("=== SUMMARY ===");
console.log(
  `Total unique run types across all Pfitzinger plans: ${allRunTypes.size}`
);
console.log("\nAll unique run types:");
Array.from(allRunTypes)
  .sort()
  .forEach((type, index) => {
    console.log(`${index + 1}. ${type}`);
  });

// Group by frequency
const typeFrequency = {};
pfitzFiles.forEach(filePath => {
  const fullPath = path.join(
    "/Users/joshua.moreton/Documents/GitHub/calendar-hack",
    filePath
  );
  try {
    const content = fs.readFileSync(fullPath, "utf8");
    const plan = JSON.parse(content);

    if (plan.weeks) {
      plan.weeks.forEach(week => {
        if (week.workouts) {
          week.workouts.forEach(workout => {
            if (workout.type) {
              typeFrequency[workout.type] =
                (typeFrequency[workout.type] || 0) + 1;
            }
          });
        }
      });
    }
  } catch (error) {
    // Skip errors for summary
  }
});

console.log("\n=== RUN TYPE FREQUENCY ===");
Object.entries(typeFrequency)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    console.log(`${type}: ${count} occurrences`);
  });
