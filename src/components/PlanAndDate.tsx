import { DateControl } from "./DateControl";
import PlanPicker from "./PlanPicker";
import { PlanSummary } from "types/app";
import { WeekStartsOn } from "../ch/datecalc";
import { useState, useEffect } from "react";

interface Props {
  availablePlans: PlanSummary[];
  selectedPlan: PlanSummary;
  selectedDate: Date;
  dateChangeHandler: (d: Date) => void;
  selectedPlanChangeHandler: (p: PlanSummary) => void;
  weekStartsOn: WeekStartsOn;
}

const PlanAndDate = ({
  selectedPlan,
  selectedPlanChangeHandler,
  availablePlans,
  selectedDate,
  dateChangeHandler,
  weekStartsOn,
}: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-6 sm:p-8 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100">
      <div className={`${isMobile ? "w-full mb-6" : "w-2/5 mr-6 flex-grow max-w-[600px]"}`}>
        <PlanPicker
          availablePlans={availablePlans}
          selectedPlan={selectedPlan}
          planChangeHandler={selectedPlanChangeHandler}
        />
      </div>

      <h3 
        className="text-base mx-0 sm:mx-6 my-3 sm:my-0 flex items-center text-center font-montserrat text-gray-600 font-medium tracking-wider relative"
      >
        <span className="hidden md:block h-px w-6 bg-gradient-to-r from-transparent to-primary-300 mx-2"></span>
        <span className="px-2">ENDING ON</span>
        <span className="hidden md:block h-px w-6 bg-gradient-to-l from-transparent to-primary-300 mx-2"></span>
      </h3>

      <div className={`${isMobile ? "w-full" : "w-auto"}`}>
        <DateControl
          selectedDate={selectedDate}
          onDateChanged={dateChangeHandler}
          weekStartsOn={weekStartsOn}
        />
      </div>
    </div>
  );
};

export default PlanAndDate;
