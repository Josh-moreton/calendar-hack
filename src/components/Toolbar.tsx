import HomeButton from "./HomeButton";
import GitHubButton from "./GitHubButton";

const Toolbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-blue-800 text-white shadow-md w-full">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="w-full flex items-center justify-between h-16 sm:h-[70px] max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <HomeButton />
            <h1 className="flex items-center font-montserrat text-[1.6rem] sm:text-[1.8rem] font-bold tracking-tight text-white uppercase">
              STRID<span className="text-orange-400 font-extrabold">R</span>
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <GitHubButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
