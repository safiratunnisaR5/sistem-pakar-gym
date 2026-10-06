import React, { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced Icons
const Icons = {
  Error: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Refresh: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Home: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Support: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0a9 9 0 01-12.728 0m12.728 0L21 21M3 3l3.536 3.536m0 0a9 9 0 0112.728 0" />
    </svg>
  ),
  ArrowLeft: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  Bug: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      isVisible: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Global Error:', error, errorInfo);
    // Kirim ke layanan monitoring (misal Sentry) jika ada
  }

  componentDidMount() {
    // Trigger entrance animation
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 100);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, isVisible } = this.state;

      return (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-4 overflow-hidden"
          >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10"
                  animate={{
                    x: [
                      Math.random() * 100 - 50,
                      Math.random() * 100 - 50,
                      Math.random() * 100 - 50,
                    ],
                    y: [
                      Math.random() * 100 - 50,
                      Math.random() * 100 - 50,
                      Math.random() * 100 - 50,
                    ],
                    scale: [0, 1, 0],
                    opacity: [0, 0.2, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: 4 + Math.random() * 8,
                    height: 4 + Math.random() * 8,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Animated Gradient Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 30, 
                scale: isVisible ? 1 : 0.95 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 150, 
                damping: 25,
                delay: 0.1,
              }}
              className="relative w-full max-w-lg z-10"
            >
              {/* Glow behind card */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-pink-500/20 rounded-2xl blur-xl"
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

              {/* Card with glassmorphism */}
              <motion.div
                className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 border border-gray-700/50 p-8 overflow-hidden"
              >
                {/* Decorative top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                {/* Card gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-pink-500/5 pointer-events-none" />

                {/* Error Icon with bounce animation */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center mb-6 relative"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 blur-sm animate-pulse" />
                    <span className="text-6xl relative z-10">😵</span>
                  </div>
                </motion.div>

                {/* Title with gradient */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-center bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2"
                >
                  Terjadi Kesalahan
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-center text-sm mb-6"
                >
                  Maaf, aplikasi mengalami masalah. Tim kami sudah diberitahu.
                </motion.p>

                {/* Error details (only in development) */}
                {process.env.NODE_ENV === 'development' && error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl overflow-hidden"
                  >
                    <p className="text-xs text-red-400 font-mono break-all">
                      <span className="font-semibold">Error:</span> {error.toString()}
                    </p>
                    {errorInfo && (
                      <p className="text-xs text-red-400/70 font-mono break-all mt-1">
                        <span className="font-semibold">Stack:</span> {errorInfo.componentStack}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Quick actions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={this.handleReload}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <Icons.Refresh className="w-4 h-4" />
                    Muat Ulang Halaman
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={this.handleGoBack}
                    className="flex-1 px-6 py-3 bg-gray-800/50 text-gray-300 rounded-xl border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <Icons.ArrowLeft className="w-4 h-4" />
                    Kembali
                  </motion.button>
                </motion.div>

                {/* Additional options */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500"
                >
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center gap-1.5 hover:text-gray-300 transition-colors duration-200"
                  >
                    <Icons.Home className="w-3 h-3" />
                    Beranda
                  </button>
                  <span className="text-gray-600">•</span>
                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="flex items-center gap-1.5 hover:text-gray-300 transition-colors duration-200"
                  >
                    <Icons.Support className="w-3 h-3" />
                    Bantuan
                  </button>
                  <span className="text-gray-600">•</span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Bug className="w-3 h-3 text-red-400" />
                    <span className="text-gray-400">Error Report</span>
                  </span>
                </motion.div>

                {/* Status indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 pt-4 border-t border-gray-700/50 text-center"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                    {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    <span className="text-gray-600">•</span>
                    Code: ERR-{(error?.message?.length || 0) + Date.now().toString().slice(-4)}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;