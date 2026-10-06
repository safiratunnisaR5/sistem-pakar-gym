import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const MemberLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const mainRef = useRef(null);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
    // Show loading state on route change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location, isMobile]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Generate page title from pathname
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path || path === 'member' || path === '') return 'Dashboard';
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Generate breadcrumb items
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        path: currentPath,
        label: label,
        isLast: index === paths.length - 1
      });
    });
    
    return breadcrumbs;
  };

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.97
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.97,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 30,
        mass: 0.8
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 30,
        mass: 0.8
      }
    }
  };

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Animated Overlay for mobile */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Animated Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${isMobile && !sidebarOpen ? 'pointer-events-none' : 'pointer-events-auto'}
        `}
      >
        <Sidebar 
          role="Member" 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          isMobile={isMobile}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className={`
          flex-1 flex flex-col min-w-0 
          transition-all duration-300 ease-in-out
          ${sidebarOpen && !isMobile ? 'lg:ml-0' : ''}
        `}
        layout
      >
        {/* Enhanced Navbar */}
        <div className={`
          sticky top-0 z-30
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-gray-700/50' 
            : 'bg-gray-900/80 backdrop-blur-md shadow-lg shadow-black/20 border-b border-gray-700/30'
          }
        `}>
          <Navbar
            role="Member"
            toggleSidebar={toggleSidebar}
            pageTitle={getPageTitle()}
            isMobile={isMobile}
            sidebarOpen={sidebarOpen}
            scrolled={scrolled}
          />
        </div>

        {/* Main content area */}
        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          <div className="min-h-full p-4 sm:p-6 lg:p-8">
            {/* Enhanced Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6 flex flex-wrap items-center justify-between gap-3"
            >
              {/* Breadcrumb navigation */}
              <div className="flex items-center flex-wrap gap-2 text-sm">
                <motion.span 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-gray-500 text-lg"
                >
                  🏠
                </motion.span>
                <span className="text-gray-600">/</span>
                
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        font-medium transition-colors duration-200
                        ${item.isLast 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold'
                          : 'text-gray-400 hover:text-gray-200 cursor-pointer'
                        }
                      `}
                    >
                      {item.label}
                    </motion.span>
                    {!item.isLast && (
                      <span className="text-gray-600">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Quick actions */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium">System Online</span>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Content with page transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative"
              >
                {/* Decorative gradient header */}
                <div className="absolute -top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <div className="absolute -top-6 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm" />
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                          className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Content */}
                <div className={`relative transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
                  <Outlet />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Enhanced Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`
            relative bg-gray-900/80 backdrop-blur-md border-t border-gray-700/30 
            py-4 px-6 text-center
            transition-all duration-300
            ${scrolled ? 'shadow-inner shadow-black/20' : ''}
          `}
        >
          {/* Animated gradient line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-purple-500/30 to-pink-500/0 animate-shimmer" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-4 text-gray-500">
              <span>© {new Date().getFullYear()} BroGym</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Member Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                System Online
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">v2.0.0</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default MemberLayout;