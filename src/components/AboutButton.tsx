import { NavLink } from "react-router-dom";

const AboutButton = () => {
  return (
    <div className="group relative">
      <NavLink
        to="/about"
        className={({ isActive }) => 
          `inline-flex items-center justify-center w-10 h-10 mx-1 rounded-lg transition-all duration-200 
           focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
             isActive 
               ? 'text-accent-600 bg-accent-50' 
               : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
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
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
            clipRule="evenodd" 
          />
        </svg>
      </NavLink>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs 
                      text-white bg-neutral-900 rounded opacity-0 group-hover:opacity-100 transition-opacity 
                      duration-200 pointer-events-none whitespace-nowrap">
        About
      </div>
    </div>
  );
};

export default AboutButton;
