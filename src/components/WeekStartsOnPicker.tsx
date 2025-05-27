import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "center",
        gap: 2,
        mb: 3,
        width: "100%",
        maxWidth: { xs: "100%", lg: "90%", xl: "80%" },
        mx: "auto",
        p: { xs: 2, sm: 3 },
        borderRadius: "8px",
        backgroundColor: "rgba(52, 152, 219, 0.04)",
        border: "1px dashed rgba(44, 62, 80, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "1.125rem",
          fontWeight: 600,
          minWidth: "max-content",
          color: "text.primary",
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.01em",
        }}
      >
        Week Starts On
      </Typography>

      <FormControl
        size="small"
        sx={{
          minWidth: "150px",
          backgroundColor: "white",
          borderRadius: "4px",
        }}
      >
        <InputLabel id="week-start-select-label">Day</InputLabel>
        <Select
          labelId="week-start-select-label"
          id="week-start-select"
          value={weekStartsOn.toString()}
          onChange={handleChange}
          label="Day"
        >
          <MenuItem value={WeekStartsOnValues.Monday.toString()}>
            Monday
          </MenuItem>
          <MenuItem value={WeekStartsOnValues.Sunday.toString()}>
            Sunday
          </MenuItem>
          <MenuItem value={WeekStartsOnValues.Saturday.toString()}>
            Saturday
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default WeekStartsOnPicker;
