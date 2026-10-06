import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ 
  size = 'md', 
  variant = 'spinner', 
  text = 'Loading...',
  fullScreen = false,
  overlay = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-[5px]',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
  };

  // Gradient spinner with multiple colored segments
  const SpinnerLoader = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      {/* Outer glow */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />
      
      {/* Main spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-t-transparent animate-spin relative`}
          style={{ 
            borderColor: 'rgb(var(--accent))',
            borderTopColor: 'transparent',
            borderImage: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899) 1',
          }}
        />
        {/* Inner spinning accent */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent animate-spin-slow`}
          style={{ 
            borderColor: 'rgba(99, 102, 241, 0.2)',
            borderTopColor: 'transparent',
            borderBottomColor: 'rgba(168, 85, 247, 0.3)',
          }}
        />
      </div>
      
      {/* Text */}
      {text && (
        <motion.p 
          className={`mt-3 text-center ${textSizeClasses[size]} text-gray-400 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Gradient dots loader
  const DotsLoader = () => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-blue-400',
      'bg-gradient-to-r from-purple-500 to-purple-400',
      'bg-gradient-to-r from-pink-500 to-pink-400',
    ];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex justify-center items-center gap-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`${dotSizeClasses[size]} rounded-full ${colors[i]}`}
              animate={{
                y: [0, -16, 0],
                scale: [1, 1.2, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {text && (
          <motion.p 
            className={`${textSizeClasses[size]} text-gray-400 font-medium`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {text}
          </motion.p>
        )}
      </motion.div>
    );
  };

  // Pulse loader (skeleton style)
  const PulseLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="flex flex-col gap-2 w-full">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-${size === 'sm' ? '8' : size === 'lg' ? '14' : '10'} rounded-xl bg-gray-700/30 w-full`}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1, 0.98],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {text && (
        <motion.p 
          className={`${textSizeClasses[size]} text-gray-400 font-medium`}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Progress loader with animated bar
  const ProgressLoader = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3 w-full max-w-xs"
    >
      <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: '60%' }}
        />
      </div>
      {text && (
        <motion.p 
          className={`${textSizeClasses[size]} text-gray-400 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Ring loader with SVG
  const RingLoader = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <svg
        className={`${sizeClasses[size]} animate-spin`}
        viewBox="0 0 50 50"
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          style={{ color: 'rgb(var(--accent))' }}
        />
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          style={{ 
            color: 'rgb(var(--accent))',
            strokeDasharray: '125.6',
          }}
          animate={{
            strokeDashoffset: [0, 125.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      
      {text && (
        <motion.p 
          className={`mt-3 text-center ${textSizeClasses[size]} text-gray-400 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Bounce loader
  const BounceLoader = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="flex justify-center items-center gap-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`${dotSizeClasses[size]} rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {text && (
        <motion.p 
          className={`${textSizeClasses[size]} text-gray-400 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  // Render loader based on variant
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'progress':
        return <ProgressLoader />;
      case 'ring':
        return <RingLoader />;
      case 'bounce':
        return <BounceLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  // Full screen or overlay wrapper
  if (fullScreen || overlay) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            ${overlay ? 'bg-black/60 backdrop-blur-sm' : 'bg-gray-900/80 backdrop-blur-md'}
          `}
        >
          <div className={className}>
            {renderLoader()}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className={`flex justify-center items-center py-10 ${className}`}>
      {renderLoader()}
    </div>
  );
};

export default Loader;