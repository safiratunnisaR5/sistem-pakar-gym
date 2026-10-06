import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brogymLogo from '../assets/images/brogym-logo.jpeg';
import { useNotification } from '../context/NotificationContext';

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotification();
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 animate-slide-in ${
            notif.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200' 
              : notif.type === 'error' 
              ? 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200'
              : 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="text-sm">{notif.message}</p>
            <button
              onClick={() => removeNotification(notif.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AuthLayout = ({ children, title, subtitle, logo }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoError, setLogoError] = useState(false);

  // Track mouse position for parallax glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95,
      rotateX: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 25,
        delay: 0.1,
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
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

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.4,
      }
    }
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      }
    }
  };

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              scale: 0,
            }}
            animate={{
              x: [
                `${particle.x}%`,
                `${(particle.x + (Math.random() - 0.5) * 40)}%`,
                `${(particle.x + (Math.random() - 0.5) * 40)}%`,
                `${particle.x}%`,
              ],
              y: [
                `${particle.y}%`,
                `${(particle.y + (Math.random() - 0.5) * 40)}%`,
                `${(particle.y + (Math.random() - 0.5) * 40)}%`,
                `${particle.y}%`,
              ],
              scale: [0, 1, 1, 0],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.5,
            y: mousePosition.y * -0.5,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Card container with parallax effect */}
      <motion.div
        className="relative w-full max-w-md z-10"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glow effect behind card */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Card utama with glassmorphism */}
        <motion.div
          variants={cardVariants}
          className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 border border-gray-700/50 p-6 sm:p-8 overflow-hidden"
        >
          {/* Card gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
          
          {/* Decorative top line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          {/* Logo/Branding with animation - GANTI DENGAN LOGO JPG */}
          {logo ? (
            <motion.div 
              variants={logoVariants}
              className="text-center mb-6"
            >
              {logo}
            </motion.div>
          ) : (
            <motion.div 
              variants={logoVariants}
              className="text-center mb-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 mb-3 relative"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-sm" />
                
                {/* GANTI: SVG icon dengan logo JPG */}
                <div className="relative z-10 w-10 h-10 rounded-lg overflow-hidden">
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
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                BroGym
              </motion.h1>
              {subtitle && (
                <motion.p 
                  variants={titleVariants}
                  className="text-sm text-gray-400 mt-1"
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Title & Subtitle */}
          {title && !logo && (
            <motion.div 
              variants={titleVariants}
              className="text-center mb-6"
            >
              <motion.h2 
                className="text-xl font-semibold text-white"
                whileHover={{ scale: 1.01 }}
              >
                {title}
              </motion.h2>
              {subtitle && (
                <motion.p 
                  className="text-sm text-gray-400 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Content */}
          <motion.div 
            variants={contentVariants}
            className="relative"
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.div 
            variants={footerVariants}
            className="mt-6 text-center text-xs text-gray-500 border-t border-gray-700/50 pt-4 relative"
          >
            {/* Decorative dot */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>&copy; {new Date().getFullYear()} BroGym</span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="text-gray-600">All rights reserved</span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-600">Secure</span>
              </span>
            </div>
          </motion.div>

          {/* Animated decorative corner accents */}
          <motion.div
            className="absolute top-4 right-4 w-1 h-1 bg-blue-500/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-1 h-1 bg-purple-500/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
      <NotificationToast />
    </div>
  );
};

export default AuthLayout;