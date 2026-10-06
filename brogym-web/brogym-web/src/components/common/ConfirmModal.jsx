import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Icons
const Icons = {
  Danger: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Warning: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Info: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Success: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Close: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  message = 'Apakah Anda yakin?',
  variant = 'danger',
  confirmText,
  cancelText = 'Batal',
  loading = false,
  className = '',
}) => {
  const defaultConfirmText = {
    danger: 'Hapus',
    warning: 'Konfirmasi',
    info: 'OK',
    success: 'Ya',
  }[variant] || 'Konfirmasi';
  const finalConfirmText = confirmText || defaultConfirmText;

  const variantStyles = {
    danger: {
      button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-red-500/30',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-800',
      glowColor: 'red-500',
    },
    warning: {
      button: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus:ring-yellow-500 shadow-yellow-500/30',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      glowColor: 'yellow-500',
    },
    info: {
      button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 shadow-blue-500/30',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
      glowColor: 'blue-500',
    },
    success: {
      button: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 focus:ring-green-500 shadow-green-500/30',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
      glowColor: 'green-500',
    },
  };

  const styles = variantStyles[variant] || variantStyles.danger;

  const getIcon = () => {
    switch (variant) {
      case 'danger': return <Icons.Danger className={`w-6 h-6 ${styles.iconColor}`} />;
      case 'warning': return <Icons.Warning className={`w-6 h-6 ${styles.iconColor}`} />;
      case 'info': return <Icons.Info className={`w-6 h-6 ${styles.iconColor}`} />;
      case 'success': return <Icons.Success className={`w-6 h-6 ${styles.iconColor}`} />;
      default: return <Icons.Danger className={`w-6 h-6 ${styles.iconColor}`} />;
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, loading]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      rotateX: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        delay: 0.1,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      rotateX: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      }
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.2,
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.3,
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Overlay dengan blur */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => !loading && onClose()}
        />

        {/* Modal Card */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Animated gradient border */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${styles.glowColor}/0 via-${styles.glowColor}/50 to-${styles.glowColor}/0 animate-shimmer`} />

          {/* Header: Ikon + Judul */}
          <div className="p-6 pb-0">
            <div className="flex items-start gap-4">
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`flex-shrink-0 rounded-full p-3 ${styles.iconBg} relative`}
              >
                <div className={`absolute inset-0 rounded-full bg-${styles.glowColor}/20 blur-md animate-pulse`} />
                <div className="relative z-10">
                  {getIcon()}
                </div>
              </motion.div>
              <div className="flex-1">
                <motion.h3 
                  id="modal-title" 
                  className="text-lg font-bold text-gray-900 dark:text-white"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {title}
                </motion.h3>
                <motion.p 
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={0.1}
                >
                  {message}
                </motion.p>
              </div>
              <motion.button
                variants={buttonVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !loading && onClose()}
                className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                disabled={loading}
              >
                <Icons.Close className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="mx-6 mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

          {/* Tombol Aksi */}
          <motion.div 
            className="p-6 pt-4 flex flex-col sm:flex-row justify-end gap-3"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.button
              variants={buttonVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              onClick={() => !loading && onClose()}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
            >
              {cancelText}
            </motion.button>
            <motion.button
              variants={buttonVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              onClick={onConfirm}
              disabled={loading}
              className={`px-6 py-2.5 text-sm font-medium text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${styles.button} disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 order-1 sm:order-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </>
              ) : (
                finalConfirmText
              )}
            </motion.button>
          </motion.div>

          {/* Decorative corner accents */}
          <motion.div
            className="absolute top-3 right-3 w-1 h-1 rounded-full opacity-30"
            style={{ background: `rgb(var(--${styles.glowColor}))` }}
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
            className="absolute bottom-3 left-3 w-1 h-1 rounded-full opacity-30"
            style={{ background: `rgb(var(--${styles.glowColor}))` }}
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
    </AnimatePresence>
  );
};

export default ConfirmModal;