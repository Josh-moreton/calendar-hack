import React, { useState, useEffect } from "react";
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
    <section className="relative overflow-hidden rounded-b-3xl md:rounded-b-[32px] mb-10 shadow-lg bg-gradient-to-br from-blue-900 to-blue-600 text-white">
      {/* Abstract background pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover z-[1]"
        style={{ backgroundImage: "url('/path-pattern.svg')" }}
      />

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
            className="absolute w-[300px] h-[300px] rounded-full top-0 left-0 z-[1]"
            style={{
              background: "radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, rgba(251, 146, 60, 0) 70%)",
            }}
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
            className="absolute w-[400px] h-[400px] rounded-full bottom-[-10%] right-[-10%] z-[1]"
            style={{
              background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0) 70%)",
            }}
          />
        </>
      )}

      <div className="container mx-auto max-w-5xl relative z-[2] py-12 md:py-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="max-w-full md:max-w-1/2 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-orange-400 font-semibold mb-2 tracking-wider uppercase text-lg"
            >
              Run Smarter, Train Better
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-extrabold mb-4 font-manrope tracking-tight leading-tight text-4xl md:text-5xl"
            >
              Your Personal Running Training Calendar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-white/90 text-base md:text-lg mb-8 max-w-[600px] mx-auto md:mx-0"
            >
              Customize your perfect training plan for any race distance and
              achieve your personal best. Designed for runners of all levels to
              reach their goals.
            </motion.p>

            <div className="flex gap-4 flex-col sm:flex-row justify-center md:justify-start">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.89 19.38l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L9 8.25v4.75h2v-3.4l1.89 8.63z"/>
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
              className="max-w-1/2 flex justify-center"
            >
              <img
                src="/training-illustration.svg"
                alt="Running Calendar Illustration"
                className="w-full max-w-[450px] filter drop-shadow-lg"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
