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
import PaceInput from "./components/PaceInput";
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
import { Units, PlanSummary, dayOfWeek, PaceSettings } from "types/app";
import { getLocaleUnits } from "./ch/localize";
import HeroSection from "./components/HeroSection";

type ViewState = "selection" | "calendar";

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
  const [selectedPlan, setSelectedPlan] = useState(repo.find(p || ""));
  const [racePlan, setRacePlan] = useState<RacePlan | undefined>(undefined);
  const [undoHistory, setUndoHistory] = useState([] as RacePlan[]);
  const [weekStartsOn, setWeekStartsOn] = useState<WeekStartsOn>(
    s === 0 || s === 1 || s === 6 ? s : WeekStartsOnValues.Monday
  );
  const [planEndDate, setPlanEndDate] = useState(
    d && isAfter(d, new Date())
      ? d
      : addWeeks(endOfWeek(new Date(), { weekStartsOn: weekStartsOn }), 20)
  );
  const [currentView, setCurrentView] = useState<ViewState>("selection");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paceSettings, setPaceSettings] = useState<PaceSettings | null>(null);

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

  const generateCalendar = () => {
    if (racePlan) {
      setIsTransitioning(true);
      // Add a slight delay for smooth animation
      setTimeout(() => {
        setCurrentView("calendar");
        setIsTransitioning(false);
      }, 100);
    }
  };

  const backToSelection = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("selection");
      setIsTransitioning(false);
    }, 100);
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
      const eventsStr = toIcal(racePlan, selectedUnits, paceSettings);
      if (eventsStr) {
        download(eventsStr, "plan", "ics");
      }
    }
  }

  function downloadCsvHandler() {
    if (racePlan) {
      const eventsStr = toCsv(
        racePlan,
        selectedUnits,
        weekStartsOn,
        paceSettings
      );
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

      {/* Two-page sliding container */}
      <div className="relative overflow-hidden min-h-[50vh]">
        {/* Selection Page */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            currentView === "selection"
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } ${isTransitioning ? "pointer-events-none" : ""}`}
        >
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

            {/* Plan Details Card */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Plan Details
              </h3>
              <PlanDetailsCard racePlan={racePlan} />
            </div>

            {/* Pace Calculator Card */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: "150ms" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Training Pace Calculator
              </h3>
              <PaceInput
                units={selectedUnits}
                onPaceSettingsChange={setPaceSettings}
              />
            </div>

            {/* Week Options Card */}
            <div
              className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Week Options
              </h3>
              <WeekStartsOnPicker
                weekStartsOn={weekStartsOn}
                changeHandler={onWeekStartsOnChanged}
              />
            </div>

            {/* Generate Calendar Button */}
            <div className="flex justify-center py-8">
              <button
                onClick={generateCalendar}
                disabled={!racePlan || isTransitioning}
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 px-12 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                <span className="flex items-center gap-3">
                  {isTransitioning ? (
                    <>
                      <svg
                        className="w-6 h-6 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Generate Calendar
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Page */}
        <div
          className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
            currentView === "calendar"
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          } ${isTransitioning ? "pointer-events-none" : ""}`}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-8 pb-12">
            {/* Back Button and Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm gap-4 sm:gap-0">
              <button
                onClick={backToSelection}
                disabled={isTransitioning}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">Back to Plan Selection</span>
                <span className="sm:hidden">Back</span>
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-primary-700 text-center flex-1 sm:flex-initial">
                Your Training Calendar
              </h2>
              <div className="hidden sm:block w-[140px]"></div>{" "}
              {/* Spacer for center alignment on desktop */}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download iCal
                </button>

                <button
                  onClick={downloadCsvHandler}
                  className="w-full sm:w-auto min-w-[200px] bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                  </svg>
                  Download CSV
                </button>

                <UndoButton
                  disabled={undoHistory.length <= 1}
                  undoHandler={undoHandler}
                />
              </div>
            </div>

            {/* Calendar View Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-full">
                {racePlan && (
                  <CalendarGrid
                    racePlan={racePlan}
                    units={selectedUnits}
                    weekStartsOn={weekStartsOn}
                    swapDates={swapDates}
                    swapDow={doSwapDow}
                    paceSettings={paceSettings}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
