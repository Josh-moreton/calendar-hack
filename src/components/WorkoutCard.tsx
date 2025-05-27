import React from "react";
import { render } from "../ch/rendering";
import { Dateline } from "./Dateline";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemTypes } from "../ch/ItemTypes";
import { DragHandle } from "./DragHandle";
import { DayDetails, Units } from "types/app";

interface Props {
  dayDetails: DayDetails;
  date: Date;
  units: Units;
  swap: (d1: Date, d2: Date) => void;
}

function renderDesc(
  dayDetails: DayDetails,
  from: Units,
  to: Units
): React.ReactElement {
  let [title, desc] = render(dayDetails, from, to);
  // Only render the description if it differs from the title
  // In the ical file we always render both and we automatically render the description using the same text as title if description is empty
  desc = title.replace(/\s/g, "") === desc.replace(/\s/g, "") ? "" : desc;
  return (
    <div className="w-full">
      <h4 className="font-semibold text-neutral-900 mb-2 text-sm leading-snug tracking-wide workout-title">
        {title}
      </h4>

      {desc && (
        <p className="text-neutral-600 mt-2 text-xs leading-relaxed tracking-wide 
                    bg-neutral-50 border-l-2 border-accent-500 pl-3 py-2 rounded-r workout-description">
          {desc}
        </p>
      )}
    </div>
  );
}

export const WorkoutCard = ({ dayDetails, date, units }: Props) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.DAY,
    item: { date: date, dayDetails: dayDetails, units: units },
    collect: monitor => ({
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
    <div
      ref={preview}
      className={`flex flex-col h-full rounded-md overflow-hidden transition-all duration-300 
                  bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 
                  workout-card ${isDragging ? 'opacity-50 dragging' : 'opacity-100'}`}
    >
      <Dateline $date={date} />
      <div className="flex p-4 flex-grow items-start relative workout-content"
           style={{ height: 'calc(100% - 28px)' }}>
        <div
          ref={drag}
          className="mr-3 flex items-start h-full self-stretch pt-1 opacity-70 hover:opacity-100 
                     transition-opacity duration-200 cursor-grab active:cursor-grabbing"
        >
          <DragHandle
            viewBox="0 0 32 36"
            style={{ width: "14px", height: "14px" }}
          />
        </div>
        {renderDesc(dayDetails, dayDetails.sourceUnits, units)}
      </div>
    </div>
  );
};
