import { NavLink } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const HomeButton = () => {
  const { user } = useAuth();
  
  return (
    <div className="group relative">
      <NavLink
        to="/"
        className={({ isActive }) => 
          `inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 
           focus:outline-none focus:ring-2 focus:ring-white/20 ${
             isActive 
               ? 'text-white bg-white/20' 
               : 'text-white/90 hover:text-white hover:bg-white/10'
           }`
        }
      >
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" 
          />
        </svg>
      </NavLink>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs 
                      text-white bg-neutral-900 rounded opacity-0 group-hover:opacity-100 transition-opacity 
                      duration-200 pointer-events-none whitespace-nowrap">
        Home
      </div>
    </div>
  );
};

export default HomeButton;
