import { format } from "../ch/localize";

interface Props {
  $date: Date;
}

export const Dateline = ({ $date }: Props) => {
  return (
    <div
      className="bg-gradient-to-r from-primary-800 to-primary-600 text-white py-2 px-3 text-center 
                 font-semibold text-xs uppercase tracking-wide leading-tight dateline"
    >
      {format($date)}
    </div>
  );
};
