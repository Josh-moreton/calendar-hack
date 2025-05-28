const fs = require("fs");
const path = require("path");

console.log("Starting run type extraction...");

// Test with just one file first
const testFile = "public/plans/json/pfitz_18_55.json";
const fullPath = path.join(
  "/Users/joshua.moreton/Documents/GitHub/stridr",
  testFile
);

try {
  console.log(`Reading file: ${fullPath}`);
  const content = fs.readFileSync(fullPath, "utf8");
  const plan = JSON.parse(content);

  console.log(`Plan title: ${plan.title || "No title"}`);
  console.log(
    `Number of weeks: ${plan.weeks ? plan.weeks.length : "No weeks"}`
  );

  const runTypes = new Set();

  if (plan.weeks) {
    plan.weeks.forEach((week, weekIndex) => {
      if (week.workouts) {
        week.workouts.forEach((workout, workoutIndex) => {
          if (workout.type) {
            runTypes.add(workout.type);
            console.log(
              `Week ${weekIndex + 1}, Workout ${workoutIndex + 1}: ${workout.type}`
            );
          }
        });
      }
    });
  }

  console.log(
    `\nUnique run types found: ${Array.from(runTypes).sort().join(", ")}`
  );
} catch (error) {
  console.error("Error:", error.message);
}
