import { PlanSummary } from "types/app";

interface Props {
  availablePlans: PlanSummary[];
  selectedPlan: PlanSummary;
  planChangeHandler: (p: PlanSummary) => void;
}

const PlanPicker = ({
  availablePlans,
  selectedPlan,
  planChangeHandler,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = event.target.value;
    const newSelection = availablePlans.find(p => p[1] === planId);
    if (newSelection) {
      planChangeHandler(newSelection);
    } else {
      throw new Error("Invalid selection: " + planId);
    }
  };

  return (
    <div className="w-full">
      <label 
        htmlFor="plan-select" 
        className="block text-sm font-semibold text-primary-700 mb-2"
      >
        Training Plan
      </label>
      <select
        id="plan-select"
        value={selectedPlan[1]}
        onChange={handleChange}
        className="w-full min-w-[200px] px-4 py-3 border border-slate-300 rounded-lg bg-white 
                   text-slate-700 text-base font-medium shadow-sm hover:border-primary-400 
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                   transition-all duration-200 appearance-none 
                   bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')] 
                   bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
      >
        {availablePlans.map(plan => (
          <option key={plan[1]} value={plan[1]}>
            ({plan[2]}) {plan[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlanPicker;
