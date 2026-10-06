import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../../layouts/AuthLayout';
import RegisterForm from '../../components/forms/RegisterForm';
import { Link } from 'react-router-dom';

// Enhanced Icons
const Icons = {
  Register: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  ),
  BroGym: ({ className = "w-10 h-10" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Simulate loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const welcomeVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        delay: 0.2,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      }
    }
  };

  const benefitsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      }
    }
  };

  const benefitItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }
    }
  };

  const benefits = [
    { icon: '🏋️', label: 'Personalized workout plans' },
    { icon: '🥗', label: 'Custom meal programs' },
    { icon: '📊', label: 'Track your progress' },
    { icon: '🎯', label: 'Expert fitness guidance' },
    { icon: '💪', label: 'Achieve your goals' },
    { icon: '🌟', label: 'Join fitness community' },
  ];

  return (
    <AuthLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome Message with Animation */}
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <motion.div
              key="welcome"
              variants={welcomeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center space-y-2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 mb-2 relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-sm animate-pulse" />
                <Icons.BroGym className="w-8 h-8 text-emerald-400 relative z-10" />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Join BroGym Today!
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Start your fitness journey with us
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Register Form */}
              <RegisterForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits Section */}
        <motion.div
          variants={benefitsVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={benefitItemVariants}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(52, 211, 153, 0.05)',
                transition: { duration: 0.2 }
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-base">{benefit.icon}</span>
              <span className="text-xs text-gray-300 font-medium">{benefit.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500"
        >
          <div className="flex items-center gap-1.5">
            <Icons.Shield className="w-3 h-3 text-emerald-400" />
            <span>Secure registration</span>
          </div>
          <span className="text-gray-600">•</span>
          <div className="flex items-center gap-1.5">
            <Icons.Check className="w-3 h-3 text-emerald-400" />
            <span>100% privacy guaranteed</span>
          </div>
          <span className="text-gray-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
            <span>SSL encrypted</span>
          </div>
        </motion.div>

        {/* Loading Overlay - Optional */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -16, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">Creating your account...</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AuthLayout>
  );
};

export default Register;