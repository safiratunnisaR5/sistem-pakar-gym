import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import brogymLogo from '../../assets/images/brogym-logo.jpeg';

// Enhanced Icons with micro-interactions
const Icons = {
  Menu: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Sun: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Moon: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ),
  Logout: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Bell: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  User: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

const Navbar = ({ role, toggleSidebar, pageTitle, isMobile, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { addNotification } = useNotification();
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logout();
    addNotification('👋 Logout berhasil! Sampai jumpa lagi.', 'success');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get user initials or fallback
  const userInitials = getInitials(user?.name);
  const userColor = user?.name ? 
    `hsl(${user.name.length * 37 % 360}, 70%, 50%)` : 
    '#6B7280';

  return (
    <nav className={`
      sticky top-0 z-40
      transition-all duration-300 ease-in-out
      ${scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-800/30' 
        : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md'
      }
      border-b border-gray-200/30 dark:border-gray-700/30
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section: Logo & Toggle */}
          <div className="flex items-center gap-3">
            {/* Animated Menu Button */}
            <button
              onClick={toggleSidebar}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                relative p-2 -ml-2 rounded-xl
                text-gray-500 dark:text-gray-400
                hover:text-gray-900 dark:hover:text-white
                hover:bg-gray-100/80 dark:hover:bg-gray-800/80
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                group
              `}
              aria-label="Toggle sidebar"
            >
              <Icons.Menu className={`
                w-5 h-5 transition-all duration-300
                ${isHovered ? 'scale-110 rotate-90' : 'scale-100 rotate-0'}
              `} />
              <span className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
            </button>

            {/* Logo Brogym - Menggunakan JPG */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 animate-pulse" />
                <div className="relative flex items-center gap-2">
                  {/* Logo Image */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 flex-shrink-0 bg-gray-800">
                    {!logoError ? (
                      <img 
                        src={brogymLogo} 
                        alt="Brogym" 
                        className="w-full h-full object-cover"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      // Fallback jika gambar gagal load
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm lg:text-base">
                        B
                      </div>
                    )}
                  </div>
                  <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    BroGym
                  </span>
                </div>
              </div>

              {/* Role Badge with animation */}
              {role && (
                <span className={`
                  hidden sm:inline-flex items-center gap-1.5
                  px-3 py-1 text-xs font-semibold
                  rounded-full
                  bg-gradient-to-r from-blue-500/10 to-purple-500/10
                  dark:from-blue-500/20 dark:to-purple-500/20
                  border border-blue-500/20 dark:border-blue-500/30
                  text-blue-600 dark:text-blue-400
                  transition-all duration-300
                  hover:scale-105 hover:shadow-md
                  cursor-default
                `}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  {role}
                </span>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Page Title (Desktop) */}
            {pageTitle && (
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {pageTitle}
                </span>
              </div>
            )}

            {/* Notification Bell */}
            <button className={`
              relative p-2 rounded-xl
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white
              hover:bg-gray-100/80 dark:hover:bg-gray-800/80
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              group
            `}>
              <Icons.Bell className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
            </button>

            {/* Theme Toggle with Animation */}
            <button
              onClick={toggleTheme}
              className={`
                relative p-2 rounded-xl
                text-gray-500 dark:text-gray-400
                hover:text-gray-900 dark:hover:text-white
                hover:bg-gray-100/80 dark:hover:bg-gray-800/80
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                group
              `}
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <div className={`
                  absolute inset-0 transition-all duration-500 transform
                  ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-0'}
                `}>
                  <Icons.Sun className="w-5 h-5 text-yellow-500" />
                </div>
                <div className={`
                  absolute inset-0 transition-all duration-500 transform
                  ${theme === 'dark' ? '-rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}
                `}>
                  <Icons.Moon className="w-5 h-5 text-indigo-500" />
                </div>
              </div>
              <span className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                  flex items-center gap-2.5
                  px-2 py-1.5 sm:px-3 sm:py-2
                  rounded-xl
                  hover:bg-gray-100/80 dark:hover:bg-gray-800/80
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  group
                `}
              >
                {/* Avatar with gradient ring */}
                <div className="relative">
                  <div className={`
                    absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500
                    transition-opacity duration-300
                    ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `} />
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span 
                        className="text-sm font-semibold text-white"
                        style={{ 
                          background: `linear-gradient(135deg, ${userColor}, ${userColor}dd)`,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {userInitials}
                      </span>
                    )}
                  </div>
                  {/* Online status indicator */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                </div>

                {/* User info (desktop) */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    {user?.email || 'member@example.com'}
                  </p>
                </div>

                <Icons.ChevronDown className={`
                  w-4 h-4 text-gray-500 dark:text-gray-400
                  transition-all duration-300
                  ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}
                `} />
              </button>

              {/* Dropdown Menu */}
              <div
                ref={dropdownRef}
                className={`
                  absolute right-0 mt-2 w-56
                  origin-top-right
                  transition-all duration-300 ease-out
                  ${isDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }
                `}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-gray-800/90">
                  {/* User info in dropdown (mobile) */}
                  <div className="sm:hidden px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email || 'member@example.com'}
                    </p>
                  </div>

                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                    >
                      <Icons.Logout className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                      <span>Logout</span>
                      <span className="ml-auto text-xs text-red-400/60">Quit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient bottom border animation */}
      <div className={`
        h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        transition-all duration-300
        ${scrolled ? 'opacity-100' : 'opacity-0'}
      `} />
    </nav>
  );
};

export default Navbar;