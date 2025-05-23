import { FormControl, InputLabel, Select, MenuItem, Typography, Box, SelectChangeEvent } from "@mui/material";
import { WeekStartsOn, WeekStartsOnValues } from "../ch/datecalc";

interface Props {
  weekStartsOn: WeekStartsOn;
  changeHandler: (v: WeekStartsOn) => void;
}

const WeekStartsOnPicker = ({ weekStartsOn, changeHandler }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = Number(event.target.value) as WeekStartsOn;
    changeHandler(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      gap: 2,
      mb: 2
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontSize: '1.25rem', 
          fontWeight: 500,
          minWidth: 'max-content'
        }}
      >
        Week starts on
      </Typography>
      
      <FormControl size="small" sx={{ minWidth: '120px' }}>
        <InputLabel id="week-start-select-label">Day</InputLabel>
        <Select
          labelId="week-start-select-label"
          id="week-start-select"
          value={weekStartsOn.toString()}
          onChange={handleChange}
          label="Day"
        >
          <MenuItem value={WeekStartsOnValues.Monday.toString()}>Monday</MenuItem>
          <MenuItem value={WeekStartsOnValues.Sunday.toString()}>Sunday</MenuItem>
          <MenuItem value={WeekStartsOnValues.Saturday.toString()}>Saturday</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default WeekStartsOnPicker;
