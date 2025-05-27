import { Dateline } from "./Dateline";
import { Paper, Box } from "@mui/material";

export const BlankCard = ({ date }: { date: Date }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "all 0.2s",
        bgcolor: "background.default",  // Slightly different from WorkoutCard
        opacity: 0.6,
        border: "1px dashed rgba(0,0,0,0.08)",
        "&:hover": {
          opacity: 0.8,
        }
      }}
      className="blank-card"
    >
      <Dateline $date={date} />
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          height: "calc(100% - 28px)", // Match WorkoutCard
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="blank-content"
      >
        <Box 
          sx={{
            width: "80%",
            height: "3px",
            backgroundColor: "rgba(0,0,0,0.04)",
            borderRadius: "2px",
          }}
        />
      </Box>
    </Paper>
  );
};
