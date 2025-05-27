import { ToggleButtonGroup, ToggleButton, Paper } from "@mui/material";
import { Units } from "types/app";

interface Props {
  units: Units;
  unitsChangeHandler: (u: Units) => void;
}

const UnitsButtons = ({ units, unitsChangeHandler }: Props) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newUnits: Units | null
  ) => {
    // Prevent deselection of both buttons
    if (newUnits !== null) {
      unitsChangeHandler(newUnits);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "center",
        p: { xs: 1, sm: 2 },
        mb: 3,
        width: "100%",
        maxWidth: { xs: "100%", lg: "90%", xl: "80%" },
        mx: "auto",
        backgroundColor: "transparent",
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
          width: { xs: "100%", sm: "auto" },
          maxWidth: { xs: "300px", sm: "none" },
          "& .MuiToggleButton-root": {
            borderRadius: 1,
            py: 0.8,
            px: 3,
            minWidth: { xs: "120px", sm: "140px" },
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          },
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
