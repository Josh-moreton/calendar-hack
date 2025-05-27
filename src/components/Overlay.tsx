export const Overlay = ({ color }: { color: string }) => {
  return (
    <div
      className="absolute top-0 left-0 h-full w-full z-10 opacity-50 pointer-events-none"
      style={{ backgroundColor: color }}
    />
  );
};
