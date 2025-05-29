// filepath: /Users/joshmoreton/GitHub/stridr/src/components/Footer.tsx

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-auto border-t border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-0">
          <h6 className="font-montserrat font-bold tracking-wider mb-2 sm:mb-0 text-white/90 uppercase">
            STRID
            <span className="text-orange-400">R</span>
          </h6>

          <p className="text-sm text-center opacity-80 tracking-wide">
            Professional Training Plans for Runners
          </p>
        </div>

        <div className="border-t border-white/10 pt-4 mt-4" />

        <div className="flex justify-center items-center flex-wrap gap-8">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <a
              href="mailto:hello@stridr.dev"
              className="text-white hover:text-orange-400 transition-colors duration-200"
            >
              email
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-white/80 hover:text-orange-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white/80 hover:text-orange-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5.5 7L3 12.5c0 .83.67 1.5 1.5 1.5S6 13.33 6 12.5L5.5 7zM11 7v5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h-3zm7-2.5l-1.5 5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5L18 4.5z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
