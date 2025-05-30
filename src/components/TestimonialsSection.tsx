import React from "react";
import { motion } from "framer-motion";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marathon Runner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      content: "Stridr completely transformed my training approach. The personalized plan helped me shave 15 minutes off my marathon time! The calendar integration made it so easy to stay consistent.",
      rating: 5,
      achievement: "Boston Qualifier"
    },
    {
      name: "Mike Chen",
      role: "First-time Runner", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "As a complete beginner, I was intimidated by the idea of running a 5K. Stridr's progressive plan made it achievable and enjoyable. I just completed my first 10K last month!",
      rating: 5,
      achievement: "First 10K Completed"
    },
    {
      name: "Emma Rodriguez",
      role: "Busy Professional",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", 
      content: "With my hectic work schedule, I thought consistent training was impossible. Stridr's flexible scheduling and calendar sync helped me stay on track and PR in my half marathon.",
      rating: 5,
      achievement: "Half Marathon PR"
    },
    {
      name: "David Park",
      role: "Ultra Runner",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The detailed pace calculator and progressive volume increases were perfect for my 50K training. Stridr helped me understand the science behind proper ultra preparation.",
      rating: 5,
      achievement: "First Ultra Finish"
    },
    {
      name: "Lisa Thompson",
      role: "Comeback Runner",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "After a 2-year running hiatus, I needed a structured comeback plan. Stridr's gradual progression kept me injury-free while building back my fitness. Now stronger than ever!",
      rating: 5,
      achievement: "Injury-Free Comeback"
    },
    {
      name: "James Wilson",
      role: "Age Group Competitor",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      content: "At 45, I thought my PR days were behind me. Stridr's smart training approach helped me set new personal bests in both the 10K and half marathon distances.",
      rating: 5,
      achievement: "Age Group PR"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Happy Runners", icon: "👥" },
    { number: "98%", label: "Success Rate", icon: "🎯" },
    { number: "45min", label: "Avg Time Improved", icon: "⚡" },
    { number: "12+", label: "Race Distances", icon: "🏃" }
  ];

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
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-20 lg:py-28 bg-gradient-to-br from-white to-neutral-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 border border-accent-200">
              <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
              <span className="text-accent-700 font-semibold text-sm uppercase tracking-wider">
                Success Stories
              </span>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
          >
            Real Results from{" "}
            <span className="bg-gradient-orange bg-clip-text text-transparent">
              Real Runners
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
          >
            See how Stridr has helped thousands of runners achieve their goals, from first-time 5K finishers to marathon personal record breakers.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.number}</div>
              <div className="text-neutral-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 border border-neutral-100 relative overflow-hidden group"
            >
              {/* Quote background decoration */}
              <div className="absolute top-4 right-4 text-6xl text-neutral-100 group-hover:text-secondary-100 transition-colors duration-300">
                "
              </div>
              
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-neutral-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Achievement Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 text-accent-700">
                    🏆 {testimonial.achievement}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-bold text-neutral-900">{testimonial.name}</div>
                    <div className="text-neutral-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-3xl p-12 border border-secondary-100">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Join the community of runners who have transformed their training with Stridr. Your personal best is waiting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-orange hover:shadow-glow text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Create Your Plan
              </motion.button>
              
              <div className="flex items-center text-neutral-600">
                <span className="text-sm font-medium">Free to start • No credit card required</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
