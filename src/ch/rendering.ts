import * as moo from "moo";
import { Week, DayDetails, Units, PaceSettings, WorkoutWithPaces } from "types/app";
import { substitutePacesEnhanced } from "./paceSubstitutionEnhanced";
import { renderWorkoutWithPaces } from "./universalPaceRenderer";

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
  if (paceSettings) {
    title = substitutePacesEnhanced(title, paceSettings, planId);
    desc = substitutePacesEnhanced(desc, paceSettings, planId);
  }

  return [title, desc];
}

/**
 * Enhanced render function that supports both legacy DayDetails and new WorkoutWithPaces
 */
export function renderEnhanced(
  input: DayDetails | WorkoutWithPaces,
  from: Units,
  to: Units,
  paceSettings?: PaceSettings | null,
  planId?: string
): [string, string] {
  // Check if this is a workout with structured paces
  if ('paces' in input && input.paces) {
    const result = renderWorkoutWithPaces(input as WorkoutWithPaces, paceSettings || null, planId || 'default');
    return [result.title, result.description];
  }

  // Fallback to legacy rendering for DayDetails
  return render(input as DayDetails, from, to, paceSettings, planId);
}

/**
 * Check if input uses the new pace structure
 */
export function hasStructuredPaces(input: DayDetails | WorkoutWithPaces): boolean {
  return 'paces' in input && !!(input as WorkoutWithPaces).paces && (input as WorkoutWithPaces).paces!.length > 0;
}
