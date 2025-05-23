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
        p: 0.5,
        textAlign: "center",
      }}
      className="dateline"
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 500,
          lineHeight: 1.2,
          fontSize: "0.75rem",
        }}
      >
        {format($date)}
      </Typography>
    </Box>
  );
};
