import React from "react";
import { render } from "../ch/rendering";
import { Dateline } from "./Dateline";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "../ch/ItemTypes";
import { DragHandle } from "./DragHandle";
import { DayDetails, Units } from "types/app";
import { Paper, Typography, Box } from "@mui/material";

interface Props {
  dayDetails: DayDetails;
  date: Date;
  units: Units;
  swap: (d1: Date, d2: Date) => void;
}

function renderDesc(
  dayDetails: DayDetails,
  from: Units,
  to: Units,
): React.ReactElement {
  let [title, desc] = render(dayDetails, from, to);
  // Only render the description if it differs from the title
  // In the ical file we always render both and we automatically render the description using the same text as title if description is empty
  desc = title.replace(/\s/g, "") === desc.replace(/\s/g, "") ? "" : desc;
  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="body1"
        sx={{ 
          fontWeight: 600,
          color: 'text.primary',
        }}
        className="workout-title"
      >
        {title}
      </Typography>
      
      {desc && (
        <Typography 
          variant="body2"
          sx={{ 
            color: 'text.secondary',
            mt: 0.5
          }}
          className="workout-description"
        >
          {desc}
        </Typography>
      )}
    </Box>
  );
}

export const WorkoutCard = ({ dayDetails, date, units }: Props) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.DAY,
    item: { date: date, dayDetails: dayDetails, units: units },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: dayDetails !== undefined,
    }),
    end: (item: { date: Date } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
      }
    },
  });

  return (
    <Paper
      elevation={1}
      ref={preview}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        opacity: isDragging ? 0.5 : 1,
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3
        }
      }}
      className={`workout-card ${isDragging ? "dragging" : ""}`}
    >
      <Dateline $date={date} />
      <Box 
        sx={{
          display: 'flex',
          p: 1.5,
          flexGrow: 1,
          alignItems: 'flex-start'
        }}
        className="workout-content"
      >
        <Box ref={drag} sx={{ mr: 1.5 }}>
          <DragHandle viewBox="0 0 32 36" />
        </Box>
        {renderDesc(dayDetails, dayDetails.sourceUnits, units)}
      </Box>
    </Paper>
  );
};
