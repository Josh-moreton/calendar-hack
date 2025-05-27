import { Units } from "types/app";

interface Props {
  units: Units;
  unitsChangeHandler: (u: Units) => void;
}

const UnitsButtons = ({ units, unitsChangeHandler }: Props) => {
  const handleMilesClick = () => {
    unitsChangeHandler("mi");
  };

  const handleKilometersClick = () => {
    unitsChangeHandler("km");
  };

  return (
    <div className="flex justify-center w-full mb-6">
      <div className="flex bg-slate-100 rounded-lg p-1 shadow-sm border border-slate-200">
        <button
          onClick={handleMilesClick}
          aria-label="miles"
          className={`px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 min-w-[120px] ${
            units === "mi"
              ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700"
              : "text-primary-600 hover:bg-slate-200 hover:text-primary-700"
          }`}
        >
          Miles
        </button>
        <button
          onClick={handleKilometersClick}
          aria-label="kilometers"
          className={`px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 min-w-[120px] ${
            units === "km"
              ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700"
              : "text-primary-600 hover:bg-slate-200 hover:text-primary-700"
          }`}
        >
          Kilometers
        </button>
      </div>
    </div>
  );
};

export default UnitsButtons;
