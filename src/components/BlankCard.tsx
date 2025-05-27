import { Dateline } from "./Dateline";

export const BlankCard = ({ date }: { date: Date }) => {
  return (
    <div className="flex flex-col h-full rounded-md overflow-hidden transition-all duration-200 
                    bg-neutral-50 opacity-60 border border-dashed border-neutral-200 
                    hover:opacity-80 blank-card">
      <Dateline $date={date} />
      <div className="flex-grow p-4 flex items-center justify-center blank-content"
           style={{ height: 'calc(100% - 28px)' }}>
        <div className="w-4/5 h-1 bg-neutral-100 rounded-sm" />
      </div>
    </div>
  );
};
