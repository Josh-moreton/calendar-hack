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
        p: { xs: 1, md: 2 },
        borderRadius: "6px",
        bgcolor: isHighestMileage
          ? "rgba(52, 152, 219, 0.08)"
          : "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minWidth: { xs: "60px", sm: "80px" },
        maxWidth: { xs: "90px", sm: "120px" },
        boxShadow: isHighestMileage ? 2 : 1,
        border: isHighestMileage
          ? "1px solid rgba(52, 152, 219, 0.3)"
          : "1px solid rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
      className="week-summary"
      key={"week:" + week.weekNum}
    >
      <Typography
        variant="subtitle1"
        fontWeight="700"
        align="center"
        sx={{
          color: "text.primary",
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.02em",
          mb: 0.5,
        }}
      >
        {`Week ${1 + week.weekNum}`}
      </Typography>

      {distance > 0 && (
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: isHighestMileage ? "primary.main" : "text.primary",
            fontWeight: isHighestMileage ? 600 : 400,
            mt: 0.5,
            fontSize: "0.9rem",
            backgroundColor: isHighestMileage
              ? "rgba(52, 152, 219, 0.1)"
              : "transparent",
            borderRadius: "15px",
            px: 1,
            py: 0.5,
          }}
        >
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
        <Typography
          variant="caption"
          align="center"
          sx={{ color: "text.primary" }}
        >
          Highest Mileage
        </Typography>
      )}
    </Box>
  );
};
