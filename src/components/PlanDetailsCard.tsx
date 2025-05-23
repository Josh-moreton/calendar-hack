import { RacePlan } from "../ch/dategrid";
import { Paper, Typography, Link, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  racePlan: RacePlan | undefined;
}

export const PlanDetailsCard = ({ racePlan }: Props) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        maxWidth: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <InfoIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h3" sx={{ fontWeight: 500 }}>
          Plan Details
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        {racePlan?.description}
      </Typography>

      {racePlan?.sourceUrl && (
        <Typography variant="body2">
          <Link
            href={racePlan?.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="primary"
          >
            Source
          </Link>
        </Typography>
      )}
    </Paper>
  );
};
