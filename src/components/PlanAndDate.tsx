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
    <div className="flex flex-col sm:flex-row items-center justify-center p-6 sm:p-8 mb-6 rounded-lg bg-white shadow-lg border border-gray-50">
      <div className={`${isMobile ? "w-full mb-4" : "w-2/5 mr-4 flex-grow max-w-[600px]"}`}>
        <PlanPicker
          availablePlans={availablePlans}
          selectedPlan={selectedPlan}
          planChangeHandler={selectedPlanChangeHandler}
        />
      </div>

      <h3 
        className="text-base mx-0 sm:mx-4 my-2 sm:my-0 flex items-center text-center font-montserrat text-gray-600 font-medium tracking-wider relative"
      >
        <span className="hidden md:block h-px w-5 bg-black/10 mx-1"></span>
        ENDING ON
        <span className="hidden md:block h-px w-5 bg-black/10 mx-1"></span>
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
