import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WeekStartsOn } from "../ch/datecalc";
import { format } from "../ch/localize";

interface Props {
  selectedDate: Date;
  onDateChanged: (date: Date) => void;
  weekStartsOn: WeekStartsOn;
}

interface ButtonProps {
  selectedDate: Date;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

// Using forwardRef to properly handle the ref from DatePicker
const DateInputButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ selectedDate, onClick }, ref) => {
    if (!selectedDate) {
      return <></>;
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        className="flex items-center justify-start min-w-[200px] px-4 py-3 border border-neutral-300 
                   rounded-lg bg-white text-neutral-900 font-medium hover:border-primary-400 
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                   transition-all duration-200 cursor-pointer"
      >
        <svg 
          className="w-5 h-5 mr-2 text-neutral-600" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fillRule="evenodd" 
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
            clipRule="evenodd" 
          />
        </svg>
        {format(selectedDate)}
      </button>
    );
  }
);

DateInputButton.displayName = "DateInputButton";

export class DateControl extends React.Component<Props> {
  render() {
    const { selectedDate, onDateChanged, weekStartsOn } = this.props;

    return (
      <div className="date-picker-wrapper">
        <DatePicker
          selected={selectedDate}
          onChange={onDateChanged}
          dateFormat="P"
          customInput={
            <DateInputButton selectedDate={selectedDate} onClick={() => {}} />
          }
          calendarStartDay={weekStartsOn}
          popperPlacement="bottom-start"
          wrapperClassName="date-picker-wrapper"
        />
      </div>
    );
  }
}
