import React, { useState } from "react";
import { repo } from "./ch/planrepo";
import { endOfWeek, addWeeks, isAfter } from "date-fns";
import { RacePlan } from "./ch/dategrid";
import { build, swap, swapDow } from "./ch/planbuilder";
import { CalendarGrid } from "./components/CalendarGrid";
import { toIcal } from "./ch/icalservice";
import { toCsv } from "./ch/csvService";
import { download } from "./ch/downloadservice";
import UnitsButtons from "./components/UnitsButtons";
import PlanAndDate from "./components/PlanAndDate";
import UndoButton from "./components/UndoButton";
import history from "./defy/history";
import {
  useQueryParams,
  StringParam,
  DateParam,
  NumberParam,
} from "use-query-params";
import { PlanDetailsCard } from "./components/PlanDetailsCard";
import { WeekStartsOn, WeekStartsOnValues } from "./ch/datecalc";
import WeekStartsOnPicker from "./components/WeekStartsOnPicker";
import { useMountEffect } from "./ch/hooks";
import { Units, PlanSummary, dayOfWeek } from "types/app";
import { getLocaleUnits } from "./ch/localize";
import HeroSection from "./components/HeroSection";

const App = () => {
  const [{ u, p, d, s }, setq] = useQueryParams({
    u: StringParam,
    p: StringParam,
    d: DateParam,
    s: NumberParam,
  });
  const [selectedUnits, setSelectedUnits] = useState<Units>(
    u === "mi" || u === "km" ? u : getLocaleUnits()
  );
  var [selectedPlan, setSelectedPlan] = useState(repo.find(p || ""));
  var [racePlan, setRacePlan] = useState<RacePlan | undefined>(undefined);
  var [undoHistory, setUndoHistory] = useState([] as RacePlan[]);
  var [weekStartsOn, setWeekStartsOn] = useState<WeekStartsOn>(
    s === 0 || s === 1 || s === 6 ? s : WeekStartsOnValues.Monday
  );
  var [planEndDate, setPlanEndDate] = useState(
    d && isAfter(d, new Date())
      ? d
      : addWeeks(endOfWeek(new Date(), { weekStartsOn: weekStartsOn }), 20)
  );

  useMountEffect(() => {
    initialLoad(selectedPlan, planEndDate, selectedUnits, weekStartsOn);
  });

  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    // listen for changes to the URL and force the app to re-render
    history.listen(() => {
      forceUpdate();
    });
  }, []);

  const getParams = (
    units: Units,
    plan: PlanSummary,
    date: Date,
    weekStartsOn: WeekStartsOn
  ) => {
    return {
      u: units,
      p: plan[0],
      d: date,
      s: weekStartsOn,
    };
  };

  const initialLoad = async (
    plan: PlanSummary,
    endDate: Date,
    units: Units,
    weekStartsOn: WeekStartsOn
  ) => {
    const racePlan = build(await repo.fetch(plan), endDate, weekStartsOn);
    setRacePlan(racePlan);
    setUndoHistory([...undoHistory, racePlan]);
    setq(getParams(units, plan, endDate, weekStartsOn));
  };

  const onSelectedPlanChange = async (plan: PlanSummary) => {
    const racePlan = build(await repo.fetch(plan), planEndDate, weekStartsOn);
    setSelectedPlan(plan);
    setRacePlan(racePlan);
    setUndoHistory([racePlan]);
    setq(getParams(selectedUnits, plan, planEndDate, weekStartsOn));
  };

  const onSelectedEndDateChange = async (date: Date) => {
    const racePlan = build(await repo.fetch(selectedPlan), date, weekStartsOn);
    setPlanEndDate(date);
    setRacePlan(racePlan);
    setUndoHistory([racePlan]);
    setq(getParams(selectedUnits, selectedPlan, date, weekStartsOn));
  };

  const onSelectedUnitsChanged = (u: Units) => {
    setSelectedUnits(u);
    setq(getParams(u, selectedPlan, planEndDate, weekStartsOn));
  };

  const onWeekStartsOnChanged = async (v: WeekStartsOn) => {
    const racePlan = build(await repo.fetch(selectedPlan), planEndDate, v);
    setWeekStartsOn(v);
    setRacePlan(racePlan);
    setUndoHistory([racePlan]);
    setq(getParams(selectedUnits, selectedPlan, planEndDate, v));
  };

  function swapDates(d1: Date, d2: Date): void {
    if (racePlan) {
      const newRacePlan = swap(racePlan, d1, d2);
      setRacePlan(newRacePlan);
      setUndoHistory([...undoHistory, newRacePlan]);
    }
  }

  function doSwapDow(dow1: dayOfWeek, dow2: dayOfWeek) {
    if (racePlan) {
      const newRacePlan = swapDow(racePlan, dow1, dow2);
      setRacePlan(newRacePlan);
      setUndoHistory([...undoHistory, newRacePlan]);
    }
  }

  function downloadIcalHandler() {
    if (racePlan) {
      const eventsStr = toIcal(racePlan, selectedUnits);
      if (eventsStr) {
        download(eventsStr, "plan", "ics");
      }
    }
  }

  function downloadCsvHandler() {
    if (racePlan) {
      const eventsStr = toCsv(racePlan, selectedUnits, weekStartsOn);
      if (eventsStr) {
        download(eventsStr, "plan", "csv");
      }
    }
  }

  function undoHandler() {
    if (undoHistory?.length >= 0) {
      undoHistory.pop();
    }
    setRacePlan(undoHistory[undoHistory.length - 1]);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8 pb-12">

        {/* Customize Training Plan Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary-700">
            Customize Your Training Plan
          </h2>

          <PlanAndDate
            availablePlans={repo.available}
            selectedPlan={selectedPlan}
            selectedDate={planEndDate}
            dateChangeHandler={onSelectedEndDateChange}
            selectedPlanChangeHandler={onSelectedPlanChange}
            weekStartsOn={weekStartsOn}
          />

          <div className="flex justify-center mt-6">
            <UnitsButtons
              units={selectedUnits}
              unitsChangeHandler={onSelectedUnitsChanged}
            />
          </div>
        </div>

        {/* Download Actions */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-6 text-center text-primary-700">
            Export Your Training Plan
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
            <button
              onClick={downloadIcalHandler}
              className="w-full sm:w-auto min-w-[200px] bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download iCal
            </button>

            <button
              onClick={downloadCsvHandler}
              className="w-full sm:w-auto min-w-[200px] bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3v18h18V3H3zm8 16H5v-2h6v2zm0-4H5v-2h6v2zm0-4H5V9h6v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V9h6v2z"/>
              </svg>
              Download CSV
            </button>

            <UndoButton
              disabled={undoHistory.length <= 1}
              undoHandler={undoHandler}
            />
          </div>
        </div>

        {/* Plan Details Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 text-primary-700">
            Plan Details
          </h3>
          <PlanDetailsCard racePlan={racePlan} />
        </div>

        {/* Week Options Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-4 text-primary-700">
            Week Options
          </h3>
          <WeekStartsOnPicker
            weekStartsOn={weekStartsOn}
            changeHandler={onWeekStartsOnChanged}
          />
        </div>

        {/* Calendar View Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="text-xl font-semibold mb-6 text-primary-700">
            Calendar View
          </h3>
          <div className="w-full">
            {racePlan && (
              <CalendarGrid
                racePlan={racePlan}
                units={selectedUnits}
                weekStartsOn={weekStartsOn}
                swapDates={swapDates}
                swapDow={doSwapDow}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
