import { Dateline } from "./Dateline";
import { Paper, Box } from "@mui/material";

export const BlankCard = ({ date }: { date: Date }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        transition: 'all 0.2s',
        bgcolor: 'background.paper',
        opacity: 0.8
      }}
      className="blank-card"
    >
      <Dateline $date={date} />
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: 1.5 
        }} 
        className="blank-content" 
      />
    </Paper>
  );
};
