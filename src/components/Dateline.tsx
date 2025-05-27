import { format } from "../ch/localize";
import { Box, Typography } from "@mui/material";

interface Props {
  $date: Date;
}

export const Dateline = ({ $date }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 0.6,
        px: 1,
        textAlign: "center",
        backgroundImage:
          "linear-gradient(to right, primary.dark, primary.main)",
      }}
      className="dateline"
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.03em",
          lineHeight: 1.2,
          fontSize: "0.75rem",
          color: "primary.contrastText",
          textTransform: "uppercase",
        }}
      >
        {format($date)}
      </Typography>
    </Box>
  );
};
