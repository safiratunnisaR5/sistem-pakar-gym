import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/forms/LoginForm';
import { Link } from 'react-router-dom';
import brogymLogo from '../../assets/images/brogym-logo.jpeg';

// Enhanced Icons
const Icons = {
  Login: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  // HAPUS Icons.BroGym karena sudah diganti dengan logo JPG
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); 
  const [logoError, setLogoError] = useState(false);

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

  const featuresVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      }
    }
  };

  const featureItemVariants = {
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
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 mb-2 relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-sm animate-pulse" />
                
                {/* GANTI: Icons.BroGym dengan logo JPG */}
                <div className="relative z-10 w-8 h-8 rounded-lg overflow-hidden">
                  {!logoError ? (
                    <img 
                      src={brogymLogo} 
                      alt="Brogym" 
                      className="w-full h-full object-cover"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      B
                    </div>
                  )}
                </div>
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome Back!
              </motion.h2>
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Sign in to continue your fitness journey
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
              {/* Login Form */}
              <LoginForm />
              
              {/* Additional Links */}
              <div className="text-center space-y-2">
                <Link 
                  to="/register" 
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 inline-flex items-center gap-1 group"
                >
                  <span>Don't have an account?</span>
                  <span className="font-medium group-hover:underline">Register</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div
          variants={featuresVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
        >
          {[
            { icon: '🛡️', label: 'Secure Login' },
            { icon: '⚡', label: 'Fast Access' },
            { icon: '📊', label: 'Track Progress' },
            { icon: '🏋️', label: 'Fitness Programs' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={featureItemVariants}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                transition: { duration: 0.2 }
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="text-xs text-gray-300 font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-xs text-gray-500"
        >
          <Icons.Shield className="w-3 h-3 text-green-400" />
          <span>Secure encrypted connection</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
            <span>SSL Protected</span>
          </span>
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
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400">Authenticating...</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AuthLayout>
  );
};

export default Login;