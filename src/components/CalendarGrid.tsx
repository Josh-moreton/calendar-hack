import * as React from "react";
import { RacePlan, key } from "../ch/dategrid";
import { DayCell } from "./DayCell";
import { WeekSummary } from "./WeekSummary";
import { DayOfWeekHeader } from "./DayOfWeekHeader";
import { format } from "date-fns";
import { getDaysHeader, WeekStartsOn } from "../ch/datecalc";
import { Units, dayOfWeek, Week, DayDetails } from "types/app";
import { Box } from "@mui/material";

interface Props {
  racePlan: RacePlan;
  units: Units;
  weekStartsOn: WeekStartsOn;
  swapDates: (d1: Date, d2: Date) => void;
  swapDow: (dow1: dayOfWeek, dow2: dayOfWeek) => void;
}

function calcWeeklyDistance(w: Week<DayDetails>): number {
  return w.days
    .map((d) => d.event)
    .reduce((a, e) => {
      return !e || !e.dist ? a : a + e.dist;
    }, 0);
}

function findMaxDistance(weeks: Week<DayDetails>[]): number {
  let currMax = 0.0;
  for (var i = 0; i < weeks.length; i++) {
    let d = calcWeeklyDistance(weeks[i]);
    if (d > currMax) {
      currMax = d;
    }
  }
  return currMax;
}

export const CalendarGrid = ({
  racePlan,
  units,
  weekStartsOn,
  swapDates,
  swapDow,
}: Props) => {
  const [selectedDow, setSelectedDow] = React.useState<dayOfWeek | undefined>(
    undefined,
  );
  const [hoveringDow, setHoveringDow] = React.useState<dayOfWeek | undefined>(
    undefined,
  );
  const maxDistance = findMaxDistance(racePlan.dateGrid.weeks);

  function getWeek(w: Week<DayDetails>) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "0.75fr repeat(7, 1fr)", // Consistent with header grid
          gridAutoRows: "1fr", // Make all rows the same height
          gap: 1,
          mb: 1,
        }}
        className="week-grid"
        key={`wr:${w.weekNum}`}
      >
        <WeekSummary
          key={`ws:${w.weekNum}`}
          desc={w.desc}
          week={w}
          units={units}
          racePlan={racePlan}
          isFirstWeek={w.weekNum === 0}
          isLastWeek={w.weekNum === racePlan.dateGrid.weekCount - 1}
          isHighestMileage={
            maxDistance > 0 && calcWeeklyDistance(w) === maxDistance
          }
        ></WeekSummary>
        {w.days.map((d, _) => (
          <DayCell
            key={key(d.date)}
            date={d.date}
            units={units}
            swap={swapDates}
            dayDetails={d.event}
            selected={selectedDow === format(d.date, "EEEE")}
            hovering={hoveringDow === format(d.date, "EEEE")}
          />
        ))}
      </Box>
    );
  }

  function getHeader() {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "0.75fr repeat(7, 1fr)", // Explicitly match WeekGrid's template
          gridAutoRows: "1fr",
          gap: 1,
          mb: 1,
        }}
        className="week-grid"
      >
        <Box key={"blank-left"} />
        {getDaysHeader(weekStartsOn).map((dow, _) => (
          <DayOfWeekHeader
            key={dow}
            dow={dow as dayOfWeek}
            swapDow={swapDow}
            setSelectedDow={setSelectedDow}
            setHoveringDow={setHoveringDow}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      className="calendar-grid"
    >
      {getHeader()}
      {racePlan.dateGrid.weeks.map((w, _) => getWeek(w))}
    </Box>
  );
};
