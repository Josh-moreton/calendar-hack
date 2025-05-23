import { PlanSummary } from "types/app";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";

interface Props {
  availablePlans: PlanSummary[];
  selectedPlan: PlanSummary;
  planChangeHandler: (p: PlanSummary) => void;
}

const PlanPicker = ({
  availablePlans,
  selectedPlan,
  planChangeHandler,
}: Props) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const planId = event.target.value;
    const newSelection = availablePlans.find(
      (p) => p[1] === planId
    );
    if (newSelection) {
      planChangeHandler(newSelection);
    } else {
      throw new Error("Invalid selection: " + planId);
    }
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="plan-select-label">Training Plan</InputLabel>
      <Select
        labelId="plan-select-label"
        id="plan-select"
        value={selectedPlan[1]}
        onChange={handleChange}
        label="Training Plan"
        sx={{ 
          borderRadius: 1, 
          minWidth: '200px',
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
          }
        }}
      >
        {availablePlans.map((plan) => (
          <MenuItem key={plan[1]} value={plan[1]}>
            <Box component="span" sx={{ 
              display: 'inline-flex', 
              alignItems: 'center' 
            }}>
              <Box component="span" sx={{ 
                color: 'text.secondary',
                mr: 1
              }}>
                ({plan[2]})
              </Box>
              {plan[1]}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlanPicker;
