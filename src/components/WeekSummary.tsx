import { renderDist, getWeekDistance } from "../ch/rendering";
import StartIcon from "../svg/icons02/start.svg";
import FinishIcon from "../svg/icons02/finish.svg";
import HighMileageIcon from "../svg/highMileage.svg";
import { RacePlan } from "../ch/dategrid";
import { Week, DayDetails, Units } from "types/app";

interface Props {
  desc: string;
  week: Week<DayDetails>;
  units: Units;
  racePlan: RacePlan;
  isFirstWeek: boolean;
  isLastWeek: boolean;
  isHighestMileage: boolean;
}

export const WeekSummary = ({
  week,
  units,
  isFirstWeek,
  isLastWeek,
  isHighestMileage,
}: Props) => {
  const distance = getWeekDistance(week, units);
  return (
    <div
      className={`
        p-2 md:p-4 rounded-lg flex flex-col items-center justify-center h-full 
        min-w-[60px] sm:min-w-[80px] max-w-[90px] sm:max-w-[120px] 
        transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 week-summary
        ${isHighestMileage 
          ? 'bg-blue-50 border border-blue-200 shadow-md' 
          : 'bg-white border border-slate-100 shadow-sm'
        }
      `}
      key={"week:" + week.weekNum}
    >
      <h3 className="text-sm font-bold text-center text-neutral-900 tracking-wide mb-2">
        {`Week ${1 + week.weekNum}`}
      </h3>

      {distance > 0 && (
        <div
          className={`
            text-center text-sm mt-1 px-3 py-1 rounded-full
            ${isHighestMileage 
              ? 'text-primary-700 font-semibold bg-blue-100' 
              : 'text-neutral-700 font-normal'
            }
          `}
        >
          {renderDist(distance, units, units)}
        </div>
      )}

      {isFirstWeek && (
        <img
          src={StartIcon}
          alt="Start"
          className="w-6 h-6 my-2"
        />
      )}

      {isLastWeek && (
        <img
          src={FinishIcon}
          alt="Finish"
          className="w-6 h-6 my-2"
        />
      )}

      {isHighestMileage && (
        <img
          src={HighMileageIcon}
          alt="Highest Mileage"
          className="w-6 h-6 my-2"
        />
      )}

      {isHighestMileage && (
        <span className="text-xs text-center text-neutral-700">
          Highest Mileage
        </span>
      )}
    </div>
  );
};
