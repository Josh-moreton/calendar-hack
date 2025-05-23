import { ToggleButtonGroup, ToggleButton, Paper } from "@mui/material";
import { Units } from "types/app";

interface Props {
  units: Units;
  unitsChangeHandler: (u: Units) => void;
}

const UnitsButtons = ({ units, unitsChangeHandler }: Props) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newUnits: Units | null) => {
    // Prevent deselection of both buttons
    if (newUnits !== null) {
      unitsChangeHandler(newUnits);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        mb: 2,
        backgroundColor: 'transparent'
      }}
    >
      <ToggleButtonGroup
        value={units}
        exclusive
        onChange={handleChange}
        aria-label="distance units"
        size="small"
        color="primary"
        sx={{
          '& .MuiToggleButton-root': {
            borderRadius: 1,
            py: 0.5,
            px: 2,
            border: '1px solid',
            borderColor: 'primary.main',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }
          }
        }}
      >
        <ToggleButton value="mi" aria-label="miles">
          Mi
        </ToggleButton>
        <ToggleButton value="km" aria-label="kilometers">
          Km
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
};

export default UnitsButtons;
