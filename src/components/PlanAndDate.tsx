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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        p: 2,
        mb: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ 
        width: isMobile ? '100%' : 'auto', 
        mb: isMobile ? 2 : 0 
      }}>
        <PlanPicker
          availablePlans={availablePlans}
          selectedPlan={selectedPlan}
          planChangeHandler={selectedPlanChangeHandler}
        />
      </Box>
      
      <Typography 
        variant="h3"
        sx={{ 
          mx: 2, 
          fontSize: '1.25rem',
          display: isMobile ? 'block' : 'inline',
          textAlign: isMobile ? 'center' : 'left',
          mb: isMobile ? 1 : 0
        }}
      >
        ending on
      </Typography>
      
      <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
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
