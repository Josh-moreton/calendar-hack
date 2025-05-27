import { WeekStartsOn, WeekStartsOnValues } from "../ch/datecalc";

interface Props {
  weekStartsOn: WeekStartsOn;
  changeHandler: (v: WeekStartsOn) => void;
}

const WeekStartsOnPicker = ({ weekStartsOn, changeHandler }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(event.target.value) as WeekStartsOn;
    changeHandler(newValue);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 mb-6 w-full max-w-full lg:max-w-[90%] xl:max-w-[80%] mx-auto p-4 sm:p-6 rounded-lg bg-primary-50/30 border border-dashed border-neutral-200">
      <h3 className="text-lg font-semibold min-w-max text-neutral-900 tracking-wide">
        Week Starts On
      </h3>

      <div className="relative min-w-[150px]">
        <select
          id="week-start-select"
          value={weekStartsOn.toString()}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 font-medium 
                     hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 
                     focus:outline-none transition-all duration-200 appearance-none cursor-pointer
                     bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')] 
                     bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
        >
          <option value={WeekStartsOnValues.Monday.toString()}>
            Monday
          </option>
          <option value={WeekStartsOnValues.Sunday.toString()}>
            Sunday
          </option>
          <option value={WeekStartsOnValues.Saturday.toString()}>
            Saturday
          </option>
        </select>
      </div>
    </div>
  );
};

export default WeekStartsOnPicker;
