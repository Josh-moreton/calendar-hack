import { DragHandle } from "./DragHandle";
import { useDrop, useDrag } from "react-dnd";
import { ItemTypes } from "../ch/ItemTypes";
import { dayOfWeek } from "types/app";

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
    <div
      className={`week-header rounded-sm overflow-hidden shadow-sm transition-opacity duration-200 
                  ${isDragging ? 'opacity-50 dragging' : 'opacity-100'}`}
    >
      <div ref={drop} className="w-full h-full">
        <div className="relative w-full h-full">
          <div ref={dragPreview} className="w-full">
            <div
              ref={drag}
              className="flex items-center justify-center p-3 cursor-move bg-primary-600 w-full h-full 
                         transition-colors duration-200 hover:bg-primary-700"
            >
              <DragHandle
                viewBox="0 0 32 36"
                style={{ width: "14px", height: "14px", opacity: 0.7 }}
              />
              <span className="ml-2 font-semibold text-white uppercase tracking-wider text-sm">
                {dow}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
