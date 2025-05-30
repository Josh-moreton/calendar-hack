import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I create a personalized training plan?",
      answer: "Simply select your target race distance, choose your race date, and pick your current fitness level. Our system will generate a customized training plan with progressive workouts designed to get you to the finish line prepared and confident."
    },
    {
      question: "Can I export my training schedule to my calendar?",
      answer: "Yes! Stridr offers seamless calendar integration. You can export your entire training plan as an iCal file that works with Google Calendar, Apple Calendar, Outlook, and most other calendar applications. We also provide CSV export for additional flexibility."
    },
    {
      question: "What race distances are supported?",
      answer: "We offer training plans for all major race distances including 5K, 10K, 15K, half marathon (21K), marathon (42K), and ultra distances up to 50K. Each plan is specifically designed for the demands of that particular distance."
    },
    {
      question: "Can I modify my training plan after it's created?",
      answer: "Absolutely! Life happens, and we understand that. You can easily swap workout days using our drag-and-drop interface, adjust your race date, or even switch to a different race distance. The plan will automatically recalculate to keep you on track."
    },
    {
      question: "Is the pace calculator included?",
      answer: "Yes, our built-in pace calculator is included with every training plan. Just enter your target race time or recent race result, and we'll calculate your optimal training paces for easy runs, tempo runs, intervals, and race pace workouts."
    },
    {
      question: "How long are the training plans?",
      answer: "Training plan lengths vary by race distance and your current fitness level. Typically, 5K plans are 6-8 weeks, 10K plans are 8-12 weeks, half marathon plans are 12-16 weeks, and marathon plans are 16-20 weeks. You can customize the duration based on your timeline."
    },
    {
      question: "Are the plans suitable for beginners?",
      answer: "Definitely! We have specific plans designed for complete beginners, including walk-run progressions for new runners. Our beginner plans focus on gradually building endurance while minimizing injury risk through conservative progression."
    },
    {
      question: "Can I use Stridr if I'm training for multiple races?",
      answer: "Yes, you can create multiple training plans for different races throughout the year. Our system helps you plan your racing calendar and ensures adequate recovery time between training cycles."
    },
    {
      question: "What makes Stridr different from other training apps?",
      answer: "Stridr focuses specifically on creating calendar-ready training plans that integrate seamlessly with your daily schedule. Unlike generic apps, we provide expert-designed, periodized training with built-in flexibility and real calendar integration."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Stridr is designed as a web-based platform that works perfectly on all devices. Our responsive design ensures you have full access to all features whether you're on your phone, tablet, or desktop computer."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-500/20 border border-secondary-400/30">
              <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
              <span className="text-secondary-200 font-semibold text-sm uppercase tracking-wider">
                Frequently Asked Questions
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-orange bg-clip-text text-transparent">
              Know
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about Stridr? We've got answers. Find everything you need to know about creating and using your personalized training plans.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none focus:bg-white/5 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg 
                    className="w-6 h-6 text-secondary-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-neutral-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-neutral-300 mb-6">
              We're here to help you succeed. Reach out to our team for personalized support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-orange hover:shadow-glow text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try It Free
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
