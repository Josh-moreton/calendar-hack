import { RacePlan } from "../ch/dategrid";
import { Paper, Typography, Link, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  racePlan: RacePlan | undefined;
}

export const PlanDetailsCard = ({ racePlan }: Props) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 4,
        borderRadius: "8px",
        backgroundColor: "background.paper",
        maxWidth: "100%",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.03)",
        width: "100%",
        maxWidth: { xs: "100%", lg: "90%", xl: "80%" },
        mx: "auto",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: "linear-gradient(90deg, primary.main, secondary.main)",
          backgroundImage: "linear-gradient(90deg, #2C3E50, #3498DB)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2.5,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          pb: 2,
        }}
      >
        <InfoIcon
          sx={{ mr: 1.5, color: "primary.main", fontSize: "1.75rem" }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          Training Plan Overview
        </Typography>
      </Box>

      <Typography
        variant="body1"
        paragraph
        sx={{
          lineHeight: 1.6,
          letterSpacing: "0.01em",
          color: "text.primary",
          fontSize: "1rem",
        }}
      >
        {racePlan?.description}
      </Typography>

      {racePlan?.sourceUrl && (
        <Box
          sx={{
            mt: 3,
            pt: 1.5,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            textAlign: "right",
          }}
        >
          <Typography variant="body2">
            <Link
              href={racePlan?.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="secondary"
              sx={{
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              View Source Materials
            </Link>
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
