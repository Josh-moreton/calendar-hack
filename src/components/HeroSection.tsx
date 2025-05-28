import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-b-3xl md:rounded-b-4xl mb-5 shadow-lg">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10 bg-cover z-10" style={{backgroundImage: "url('/path-pattern.svg')"}} />

      {/* Animated circles */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ x: "-50%", y: "-50%" }}
            animate={{
              x: "-45%",
              y: "-45%",
              transition: {
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="absolute w-[300px] h-[300px] rounded-full bg-gradient-radial from-orange-400/30 to-orange-400/0 top-0 left-0 z-10"
          />
          <motion.div
            initial={{ x: "50%", y: "50%" }}
            animate={{
              x: "45%",
              y: "45%",
              transition: {
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-blue-600/30 to-blue-600/0 -bottom-[10%] -right-[10%] z-10"
          />
        </>
      )}

      <div className="container mx-auto max-w-7xl relative z-20 py-8 md:py-12 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="max-w-full md:max-w-[50%] text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-orange-400 font-semibold mb-1 tracking-wider uppercase"
            >
              Run Smarter, Train Better
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-extrabold mb-2 font-manrope tracking-tight leading-tight text-3xl md:text-4xl"
            >
              Your Personal Running Training Calendar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-white/90 text-base md:text-lg mb-4 max-w-[600px] mx-auto md:mx-0"
            >
              Customize your perfect training plan for any race distance and
              achieve your personal best. Designed for runners of all levels to
              reach their goals.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md font-bold flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
                Get Started
              </motion.button>
            </div>
          </div>

          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[50%] flex justify-center"
            >
              <img
                src="/training-illustration.svg"
                alt="Running Calendar Illustration"
                className="w-full max-w-[450px] filter drop-shadow-xl"
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
