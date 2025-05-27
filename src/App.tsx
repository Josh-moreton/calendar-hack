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
import { Box, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TableViewIcon from "@mui/icons-material/TableView";

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
    <>
      <Box
        sx={{
          borderRadius: { xs: "0 0 24px 24px", md: "0 0 32px 32px" },
          mb: 5,
          p: { xs: 3, md: 6 },
          background: `linear-gradient(135deg, #1E40AF 0%, #0F2167 100%)`,
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              mb: 2,
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Your Personal Running Training Calendar
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              mb: 0,
              opacity: 0.9,
            }}
          >
            Customize your perfect training plan for any race distance and
            achieve your personal best.
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: "16px",
          p: { xs: 2, sm: 3, md: 4 },
          mb: 4,
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "#E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          component="h2"
          sx={{
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            mb: 3,
            textAlign: "center",
            fontWeight: 700,
            color: "#1E40AF",
          }}
        >
          Customize Your Training Plan
        </Box>

        <PlanAndDate
          availablePlans={repo.available}
          selectedPlan={selectedPlan}
          selectedDate={planEndDate}
          dateChangeHandler={onSelectedEndDateChange}
          selectedPlanChangeHandler={onSelectedPlanChange}
          weekStartsOn={weekStartsOn}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            mt: 2,
          }}
        >
          <UnitsButtons
            units={selectedUnits}
            unitsChangeHandler={onSelectedUnitsChanged}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 },
          mb: 4,
          width: "100%",
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        <Button
          variant="contained"
          onClick={downloadIcalHandler}
          startIcon={<CloudDownloadIcon />}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "200px" },
          }}
        >
          Download iCal
        </Button>

        <Button
          variant="contained"
          onClick={downloadCsvHandler}
          startIcon={<TableViewIcon />}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "200px" },
          }}
        >
          Download CSV
        </Button>

        <UndoButton
          disabled={undoHistory.length <= 1}
          undoHandler={undoHandler}
        />
      </Box>

      <Box
        sx={{
          borderRadius: "16px",
          p: { xs: 2, sm: 3 },
          mb: 4,
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "#E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          component="h3"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#1E40AF",
            fontSize: "1.25rem",
          }}
        >
          Plan Details
        </Box>
        <PlanDetailsCard racePlan={racePlan} />
      </Box>

      <Box
        sx={{
          borderRadius: "16px",
          p: { xs: 2, sm: 3 },
          mb: 4,
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "#E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          component="h3"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "#1E40AF",
            fontSize: "1.25rem",
          }}
        >
          Week Options
        </Box>
        <WeekStartsOnPicker
          weekStartsOn={weekStartsOn}
          changeHandler={onWeekStartsOnChanged}
        />
      </Box>

      <Box
        sx={{
          borderRadius: "16px",
          p: { xs: 2, sm: 3 },
          mb: 4,
          bgcolor: "#FFFFFF",
          border: "1px solid",
          borderColor: "#E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <Box
          component="h3"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#1E40AF",
            fontSize: "1.25rem",
          }}
        >
          Calendar View
        </Box>

        <Box sx={{ width: "100%" }}>
          {racePlan && (
            <CalendarGrid
              racePlan={racePlan}
              units={selectedUnits}
              weekStartsOn={weekStartsOn}
              swapDates={swapDates}
              swapDow={doSwapDow}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default App;
