import React from "react";
import { motion } from "framer-motion";

const FooterSection: React.FC = () => {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Training Plans", href: "#plans" },
        { name: "Pace Calculator", href: "#calculator" },
        { name: "Calendar Export", href: "#export" },
      ]
    },
    support: {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Getting Started", href: "/getting-started" },
        { name: "FAQ", href: "#faq" },
        { name: "Contact Us", href: "/contact" },
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ]
    }
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/stridr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://instagram.com/stridr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.33c.807-.881 1.958-1.371 3.255-1.371s2.448.49 3.33 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.33c-.807.807-1.958 1.297-3.255 1.297zm7.539 0c-1.297 0-2.448-.49-3.33-1.297-.807-.807-1.297-1.958-1.297-3.255s.49-2.448 1.297-3.33c.807-.881 1.958-1.371 3.255-1.371s2.448.49 3.33 1.297c.807.807 1.297 1.958 1.297 3.255s-.49 2.448-1.297 3.33c-.807.807-1.958 1.297-3.255 1.297z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      href: "https://github.com/stridr",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
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
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-16 lg:py-20"
        >
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-orange bg-clip-text text-transparent">
                  STRIDR
                </h3>
                <p className="text-neutral-300 mt-4 leading-relaxed">
                  Professional running training plans designed to help you achieve your personal best. 
                  From 5K to marathon, we provide the tools you need to succeed.
                </p>
              </div>
              
              {/* Social links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-secondary-500 rounded-lg flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <motion.div key={key} variants={itemVariants} className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-6 text-white">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-neutral-300 hover:text-secondary-400 transition-colors duration-200 inline-flex items-center group"
                      >
                        {link.name}
                        <svg 
                          className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/10 py-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with Training Tips
            </h3>
            <p className="text-neutral-300 mb-8">
              Get weekly running tips, training insights, and exclusive content delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:border-secondary-400 focus:bg-white/20 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-orange hover:shadow-glow text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-neutral-400 text-sm">
              © 2025 Stridr. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <a href="/privacy" className="hover:text-secondary-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-secondary-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-secondary-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
