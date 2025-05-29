import { NavLink } from "react-router-dom";

const CalendarButton = () => {
  return (
    <div className="hidden sm:block">
      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isActive
              ? "text-white bg-blue-700"
              : "text-white/90 hover:text-white hover:bg-blue-700"
          }`
        }
      >
        Calendar
      </NavLink>
    </div>
  );
};

export default CalendarButton;
