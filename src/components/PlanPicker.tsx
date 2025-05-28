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
    const newSelection = availablePlans.find(p => p[0] === planId);
    if (newSelection) {
      planChangeHandler(newSelection);
    } else {
      throw new Error("Invalid selection: " + planId);
    }
  };

  const getPlanProvider = (planId: string): string => {
    if (planId.includes("pfitz") || planId.includes("frr")) {
      return "Pfitzinger/Douglas";
    } else if (planId.includes("hanson")) {
      return "Hansons Marathon Method";
    } else if (planId.includes("higdon")) {
      return "Hal Higdon";
    } else if (planId.includes("daniel")) {
      return "Jack Daniels";
    } else if (planId.includes("c25k")) {
      return "Couch to 5K";
    } else if (planId.includes("boston")) {
      return "Boston Marathon";
    } else {
      return "Other Plans";
    }
  };

  // Group plans by provider
  const groupedPlans = availablePlans.reduce(
    (groups, plan) => {
      const provider = getPlanProvider(plan[0]);
      if (!groups[provider]) {
        groups[provider] = [];
      }
      groups[provider].push(plan);
      return groups;
    },
    {} as Record<string, PlanSummary[]>
  );

  // Sort provider keys for consistent order
  const providerKeys = Object.keys(groupedPlans).sort();

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
        value={selectedPlan[0]}
        onChange={handleChange}
        className="w-full min-w-[200px] px-4 py-3 border border-slate-300 rounded-lg bg-white 
                   text-slate-700 text-base font-medium shadow-sm hover:border-primary-400 
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                   transition-all duration-200 appearance-none 
                   bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')] 
                   bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10"
      >
        {providerKeys.map(provider => (
          <optgroup key={provider} label={provider}>
            {groupedPlans[provider].map(plan => (
              <option key={plan[0]} value={plan[0]}>
                ({plan[2]}) {plan[1]}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default PlanPicker;
