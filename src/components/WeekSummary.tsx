import { renderDist, getWeekDistance } from "../ch/rendering";
import StartIcon from "../svg/icons02/start.svg";
import FinishIcon from "../svg/icons02/finish.svg";
import HighMileageIcon from "../svg/highMileage.svg";
import { RacePlan } from "../ch/dategrid";
import { Week, DayDetails, Units } from "types/app";
import { Box, Typography } from "@mui/material";

interface Props {
  desc: string;
  week: Week<DayDetails>;
  units: Units;
  racePlan: RacePlan;
  isFirstWeek: boolean;
  isLastWeek: boolean;
  isHighestMileage: boolean;
}

export const WeekSummary = ({
  week,
  units,
  isFirstWeek,
  isLastWeek,
  isHighestMileage,
}: Props) => {
  const distance = getWeekDistance(week, units);
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minWidth: "80px",
        boxShadow: 1,
      }}
      className="week-summary"
      key={"week:" + week.weekNum}
    >
      <Typography variant="subtitle1" fontWeight="bold" align="center" sx={{ color: 'text.primary' }}>
        {`Week ${1 + week.weekNum}`}
      </Typography>

      {distance > 0 && (
        <Typography variant="body2" align="center" sx={{ color: 'text.primary' }}>
          {renderDist(distance, units, units)}
        </Typography>
      )}

      {isFirstWeek && (
        <Box
          component="img"
          src={StartIcon}
          alt={"Start"}
          sx={{ width: 24, height: 24, my: 0.5 }}
        />
      )}

      {isLastWeek && (
        <Box
          component="img"
          src={FinishIcon}
          alt="Finish"
          sx={{ width: 24, height: 24, my: 0.5 }}
        />
      )}

      {isHighestMileage && (
        <Box
          component="img"
          src={HighMileageIcon}
          alt="Highest Mileage"
          sx={{ width: 24, height: 24, my: 0.5 }}
        />
      )}

      {isHighestMileage && (
        <Typography variant="caption" align="center" sx={{ color: 'text.primary' }}>
          Highest Mileage
        </Typography>
      )}
    </Box>
  );
};
