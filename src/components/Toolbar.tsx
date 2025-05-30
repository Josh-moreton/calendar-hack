import GitHubButton from "./GitHubButton";
import AboutButton from "./AboutButton";
import AuthButton from "./AuthButton";
import CalendarButton from "./CalendarButton";
import { useAuth } from "../contexts/AuthContext";

const Toolbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-blue-800 text-white shadow-md w-full">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="w-full flex items-center justify-between h-16 sm:h-[70px]">
          <div className="flex items-center">
            <h1 className="flex items-center font-montserrat text-[1.6rem] sm:text-[1.8rem] font-bold tracking-tight text-white uppercase">
              STRID<span className="text-orange-400 font-extrabold">R</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {user && <CalendarButton />}
            <AboutButton />
            <GitHubButton />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
