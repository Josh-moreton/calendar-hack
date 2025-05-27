import { DragHandle } from "./DragHandle";
import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "../ch/ItemTypes";
import { dayOfWeek } from "types/app";
import { Box, Paper, Typography } from "@mui/material";

interface Props {
  dow: dayOfWeek;
  swapDow: (dow1: dayOfWeek, dow2: dayOfWeek) => void;
  setSelectedDow: (dow: dayOfWeek | undefined) => void;
  setHoveringDow: (dow: dayOfWeek | undefined) => void;
}

export const DayOfWeekHeader = ({
  dow,
  swapDow,
  setSelectedDow,
  setHoveringDow,
}: Props) => {
  const canSwapWith = (other: dayOfWeek) => {
    return dow !== other;
  };

  // TODO Things are structurally awkward here. We're dragging + dropping these headers but we need to
  // send state "updwards" so the UI can draw itself. Restructure to clean this up.
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: ItemTypes.DOW,
    item: { id: dow },
    end: () => {
      setSelectedDow(undefined);
      setHoveringDow(undefined);
    },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  //const [{ isOver, canDrop }, drop] = useDrop({
  const [{}, drop] = useDrop({
    accept: ItemTypes.DOW,
    canDrop: (item: { id: dayOfWeek }) => canSwapWith(item.id),
    drop: (item: { id: dayOfWeek }) => {
      swapDow(dow, item.id);
    },
    collect: monitor => {
      if (monitor.isOver()) {
        if (monitor.canDrop()) {
          setHoveringDow(dow);
        } else {
          setSelectedDow(dow);
          setHoveringDow(undefined);
        }
      }
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  return (
    <Paper
      elevation={2}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        borderRadius: 1,
        overflow: "hidden",
      }}
      className={`week-header ${isDragging ? "dragging" : ""}`}
    >
      <Box ref={drop} sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box ref={dragPreview} sx={{ width: "100%" }}>
            <Box
              ref={drag}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1.5,
                cursor: "move",
                bgcolor: "primary.main",
                width: "100%", // Ensure full width
                height: "100%",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              <DragHandle
                viewBox="0 0 32 36"
                style={{ width: "14px", height: "14px", opacity: 0.7 }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  ml: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  color: "primary.contrastText",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "0.85rem",
                }}
              >
                {dow}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
