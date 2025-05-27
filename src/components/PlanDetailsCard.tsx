import { RacePlan } from "../ch/dategrid";

interface Props {
  racePlan: RacePlan | undefined;
}

export const PlanDetailsCard = ({ racePlan }: Props) => {
  return (
    <div className="relative p-6 sm:p-8 mb-8 rounded-lg bg-white shadow-md border border-neutral-100 
                    w-full max-w-full lg:max-w-[90%] xl:max-w-[80%] mx-auto overflow-hidden
                    before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 
                    before:bg-gradient-to-r before:from-neutral-700 before:to-primary-500">
      
      <div className="flex items-center mb-6 border-b border-neutral-100 pb-4">
        <div className="mr-3 text-primary-600 text-2xl">
          <svg 
            className="w-7 h-7" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 tracking-wide">
          Training Plan Overview
        </h3>
      </div>

      <p className="leading-relaxed tracking-wide text-neutral-900 text-base mb-6">
        {racePlan?.description}
      </p>

      {racePlan?.sourceUrl && (
        <div className="mt-6 pt-3 border-t border-neutral-100 text-right">
          <p className="text-sm">
            <a
              href={racePlan?.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-600 hover:text-accent-700 inline-flex items-center 
                         transition-colors duration-200 hover:underline focus:outline-none 
                         focus:ring-2 focus:ring-accent-500/20 focus:ring-offset-2 rounded-sm"
            >
              View Source Materials
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
