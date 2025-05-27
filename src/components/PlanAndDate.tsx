import { DateControl } from "./DateControl";
import PlanPicker from "./PlanPicker";
import { PlanSummary } from "types/app";
import { WeekStartsOn } from "../ch/datecalc";
import { Box, Typography, useTheme, useMediaQuery, Paper } from "@mui/material";

interface Props {
  availablePlans: PlanSummary[];
  selectedPlan: PlanSummary;
  selectedDate: Date;
  dateChangeHandler: (d: Date) => void;
  selectedPlanChangeHandler: (p: PlanSummary) => void;
  weekStartsOn: WeekStartsOn;
}

const PlanAndDate = ({
  selectedPlan,
  selectedPlanChangeHandler,
  availablePlans,
  selectedDate,
  dateChangeHandler,
  weekStartsOn,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2.5, sm: 3 },
        mb: 4,
        borderRadius: "8px",
        backgroundColor: "background.paper",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.03)",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : "40%",
          mb: isMobile ? 2 : 0,
          mr: isMobile ? 0 : 2,
          flexGrow: isMobile ? 0 : 1,
          maxWidth: isMobile ? "100%" : "600px",
        }}
      >
        <PlanPicker
          availablePlans={availablePlans}
          selectedPlan={selectedPlan}
          planChangeHandler={selectedPlanChangeHandler}
        />
      </Box>

      <Typography
        variant="h3"
        sx={{
          mx: { xs: 0, sm: 4 },
          my: { xs: 2, sm: 0 },
          fontSize: "1.125rem",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'Montserrat', sans-serif",
          color: "text.secondary",
          fontWeight: 500,
          letterSpacing: "0.02em",
          position: "relative",
          "&:before, &:after": {
            content: '""',
            display: { xs: "none", md: "block" },
            height: "1px",
            width: "20px",
            backgroundColor: "rgba(0,0,0,0.1)",
            mx: 1,
          },
        }}
      >
        ENDING ON
      </Typography>

      <Box sx={{ width: isMobile ? "100%" : "auto" }}>
        <DateControl
          selectedDate={selectedDate}
          onDateChanged={dateChangeHandler}
          weekStartsOn={weekStartsOn}
        />
      </Box>
    </Paper>
  );
};

export default PlanAndDate;
