import * as moo from "moo";
import { Week, DayDetails, Units, PaceSettings, PaceZoneKey, PaceZones } from "types/app"; // Added PaceZones
import { substitutePacesEnhanced } from "./paceSubstitutionEnhanced";
import { getPaceCalculatorForPlan } from "./paceCalculators/calculatorRegistry";

// Removed: import { formatPace } from "./formatters"; 
// formatPace will be used from the calculator instance or a local helper

export function kmToMiles(value: number): number {
  return value * 0.62137;
}

export function miToKm(value: number): number {
  return value / 0.62137;
}

export function getWeekDistance(week: Week<DayDetails>, units: Units): number {
  return week.days
    .map(d => d.event)
    .reduce((a, e) => {
      if (!e) {
        return a;
      }
      if (units === "mi") {
        if (e.dist) {
          return a + e.dist;
        } else {
          return a;
        }
      } else {
        if (e.dist) {
          return a + miToKm(e.dist);
        } else {
          return a;
        }
      }
    }, 0);
}

export function renderDist(value: number, from: Units, to: Units): string {
  let suffix = to;
  if (from === to) {
    return (
      (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)) +
      " " +
      suffix
    );
  }
  if ("mi" === from) {
    return (value / 0.62137).toFixed(1) + " " + suffix;
  }
  return (value * 0.62137).toFixed(1) + " " + suffix;
}

let dlexer = moo.compile({
  single: [{ match: /{\d+(?:\.\d+)?}/, value: x => x.slice(1, -1) }], // {17}
  with_conversion: [
    {
      match: /{\d+(?:\.\d+)?(?::\d+(?:\.\d+)?)}/,
      value: x => x.slice(1, -1),
    },
  ], // {1,1.6}
  text: /.+?/,
  NL: { match: /\n/, lineBreaks: true },
});

function handle_conversions(input: string, from: Units, to: Units): string {
  let result = "";
  dlexer.reset(input);
  let t = dlexer.next();
  while (t) {
    if (t.type === "single") {
      result += renderDist(Number(t.value), from, to);
    } else if (t.type === "with_conversion") {
      let tokens = t.value.split(":");
      if (from === to) {
        result += renderDist(Number(tokens[0]), from, from);
      } else {
        result += renderDist(Number(tokens[1]), to, to);
      }
    } else {
      // t.type === 'text' || t.type === 'NL')
      result += t.value;
    }
    t = dlexer.next();
  }
  return result;
}

export function renderStr(input: string, from: Units, to: Units): string {
  return handle_conversions(input, from, to);
}

export function render(
  input: DayDetails,
  from: Units,
  to: Units,
  paceSettings?: PaceSettings | null,
  planId?: string
): [string, string] {
  // [title, desc]
  let title = handle_conversions(input.title, from, to);
  let desc = handle_conversions(input.desc, from, to);

  // Apply pace substitutions if pace settings are provided
  if (paceSettings && planId) { // ensure planId is also present
    title = substitutePacesEnhanced(title, paceSettings, planId);
    desc = substitutePacesEnhanced(desc, paceSettings, planId);
  }

  return [title, desc];
}

// Helper function to format pace (similar to one in BasePaceCalculator)
function formatPaceLocal(paceInSeconds: number, units: Units): string {
  let paceToFormat = paceInSeconds;
  if (units === "mi") {
    // Assuming paceInSeconds is always per km from calculators
    paceToFormat = paceInSeconds * 1.609344; // convert s/km to s/mile
  }
  const minutes = Math.floor(paceToFormat / 60);
  const seconds = Math.round(paceToFormat % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}/${units}`;
}

export function getCalculatedPaceForWorkout(
  paceSettings: PaceSettings,
  planId: string,
  paceKey: PaceZoneKey,
  targetUnits: Units
): string | null {
  const calculator = getPaceCalculatorForPlan(planId);
  if (!calculator) {
    console.warn(`No pace calculator found for planId: ${planId}`);
    return null;
  }

  const raceTimeParts = paceSettings.goalTime.split(':').map(Number);
  let timeInSeconds = 0;
  if (raceTimeParts.length === 3) { // HH:MM:SS
    timeInSeconds = raceTimeParts[0] * 3600 + raceTimeParts[1] * 60 + raceTimeParts[2];
  } else if (raceTimeParts.length === 2) { // MM:SS
    timeInSeconds = raceTimeParts[0] * 60 + raceTimeParts[1];
  } else {
    console.error('Invalid race time format for pace calculation');
    return null;
  }

  const raceTime = { distance: paceSettings.raceDistance, timeInSeconds };
  const allPaces: PaceZones = calculator.calculatePaces(raceTime, paceSettings.units);
  
  // Ensure paceKey is a valid key for allPaces
  const specificPaceInSecondsPerKm = allPaces[paceKey as keyof PaceZones];

  if (specificPaceInSecondsPerKm === undefined || specificPaceInSecondsPerKm === null) {
    // console.warn(`Pace key "${paceKey}" not found in calculated paces for plan "${planId}". Available keys: ${Object.keys(allPaces).join(', ')}`);
    return null; 
  }

  // The calculators return paces in seconds per km (based on current implementation)
  // We need to format it and potentially convert to s/mile if targetUnits is 'mi'
  return formatPaceLocal(specificPaceInSecondsPerKm, targetUnits);
}
