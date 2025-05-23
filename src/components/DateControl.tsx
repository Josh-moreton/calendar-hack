import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WeekStartsOn } from "../ch/datecalc";
import { format } from "../ch/localize";
import { Button, styled } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface Props {
  selectedDate: Date;
  onDateChanged: (date: Date) => void;
  weekStartsOn: WeekStartsOn;
}

interface ButtonProps {
  selectedDate: Date;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

// Style the DatePicker to match Material UI design
const StyledDatePickerWrapper = styled("div")(({ theme }) => ({
  "& .react-datepicker": {
    fontFamily: theme.typography.fontFamily,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "8px",
    boxShadow: theme.shadows[3],
  },
  "& .react-datepicker__header": {
    backgroundColor: theme.palette.primary.main,
    borderBottom: "none",
    padding: "8px 0",
    color: "white",
  },
  "& .react-datepicker__current-month": {
    color: "white",
    fontWeight: 500,
  },
  "& .react-datepicker__navigation": {
    top: "8px",
  },
  "& .react-datepicker__day-name": {
    color: "white",
    margin: "2px",
    width: "2rem",
  },
  "& .react-datepicker__day": {
    margin: "2px",
    width: "2rem",
    height: "2rem",
    lineHeight: "2rem",
    borderRadius: "50%",
  },
  "& .react-datepicker__day--selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "& .react-datepicker__day--keyboard-selected": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .react-datepicker__day:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Using forwardRef to properly handle the ref from DatePicker
const DateInputButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ selectedDate, onClick }, ref) => {
    if (!selectedDate) {
      return <></>;
    }

    return (
      <Button
        ref={ref}
        variant="outlined"
        onClick={onClick}
        startIcon={<CalendarMonthIcon />}
        sx={{
          borderRadius: 1,
          textTransform: "none",
          minWidth: "200px",
          justifyContent: "flex-start",
        }}
      >
        {format(selectedDate)}
      </Button>
    );
  },
);

DateInputButton.displayName = "DateInputButton";

export class DateControl extends React.Component<Props> {
  render() {
    const { selectedDate, onDateChanged, weekStartsOn } = this.props;

    return (
      <StyledDatePickerWrapper>
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
      </StyledDatePickerWrapper>
    );
  }
}
