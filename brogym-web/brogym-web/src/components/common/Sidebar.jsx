import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import brogymLogo from '../../assets/images/brogym-logo.jpeg';

// Enhanced Icons with micro-interactions
const MenuIcons = {
  Dashboard: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Profile: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Membership: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Konsultasi: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Hasil: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  Riwayat: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Gym: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Members: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Program: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Meal: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Rules: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Fact: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  CF: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Laporan: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Activity: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Folder: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  ChevronDown: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  ChevronUp: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
  ),
};

const iconMap = {
  Dashboard: 'Dashboard',
  'Profil Gym': 'Gym',
  Profil: 'Profile',
  Member: 'Members',
  Membership: 'Membership',
  Kondisi: 'Folder',
  Tujuan: 'Folder',
  Penyakit: 'Folder',
  'Program Latihan': 'Program',
  'Pola Makan': 'Meal',
  'Meal Plan': 'Meal',
  'Training Program': 'Program',
  Rules: 'Rules',
  Fakta: 'Fact',
  'Fact CF': 'CF',
  Konsultasi: 'Konsultasi',
  Laporan: 'Laporan',
  'Activity Log': 'Activity',
  'Hasil Konsultasi': 'Hasil',
  'Riwayat Konsultasi': 'Riwayat',
  'Data Master': 'Folder',
  Rekomendasi: 'Rules',
};

const Sidebar = ({ role, open, setOpen, isMobile }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    'Data Master': true,
  });
  const [hoveredItem, setHoveredItem] = useState(null);
  const [logoError, setLogoError] = useState(false);

  // Auto-close on mobile when route changes
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [location, isMobile, open, setOpen]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const adminMenus = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'Dashboard' },
    {
      label: 'Data Master',
      icon: 'Folder',
      isParent: true,
      children: [
        { path: '/admin/kondisi', label: 'Kondisi', icon: 'Folder' },
        { path: '/admin/tujuan', label: 'Tujuan', icon: 'Folder' },
        { path: '/admin/penyakit', label: 'Penyakit', icon: 'Folder' },
        { path: '/admin/training-programs', label: 'Training Program', icon: 'Program' },
        { path: '/admin/meal-plans', label: 'Meal Plan', icon: 'Meal' },
        { path: '/admin/facts', label: 'Fakta', icon: 'Fact' },
        { path: '/admin/fact-cf', label: 'Fact CF', icon: 'CF' },
        { path: '/admin/rules', label: 'Rules', icon: 'Rules' },
        { path: '/admin/recommendations', label: 'Rekomendasi', icon: 'Rules' },
      ],
    },
    { path: '/admin/konsultasi', label: 'Data Konsultasi', icon: 'Konsultasi' },
  ];

  const memberMenus = [
    { path: '/member/dashboard', label: 'Dashboard', icon: 'Dashboard' },
    { path: '/member/profile', label: 'Profil', icon: 'Profile' },
    { path: '/member/konsultasi', label: 'Konsultasi', icon: 'Konsultasi' },
    { path: '/member/riwayat-konsultasi', label: 'Riwayat Konsultasi', icon: 'Riwayat' },
  ];

  const menus = role === 'Admin' ? adminMenus : memberMenus;

  const getIcon = (iconKey, className = "w-5 h-5") => {
    const IconComponent = MenuIcons[iconKey] || MenuIcons.Folder;
    return <IconComponent className={className} />;
  };

  const renderMenuItem = (menu, index) => {
    const isActive = location.pathname === menu.path;
    const isHovered = hoveredItem === `${menu.label}-${index}`;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <NavLink
          to={menu.path}
          onMouseEnter={() => setHoveredItem(`${menu.label}-${index}`)}
          onMouseLeave={() => setHoveredItem(null)}
          className={({ isActive: isNavActive }) => {
            const active = isNavActive || isActive;
            return `
              relative flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-sm font-medium transition-all duration-300
              ${active
                ? 'text-white bg-gradient-to-r from-blue-600/90 to-purple-600/90 shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
              }
              group overflow-hidden
            `;
          }}
        >
          {/* Active indicator */}
          <div className={`
            absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 
            bg-gradient-to-b from-blue-400 to-purple-400 
            rounded-r-full transition-all duration-300
            ${isActive || location.pathname === menu.path ? 'opacity-100' : 'opacity-0'}
          `} />

          {/* Hover background */}
          <div className={`
            absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 
            rounded-xl transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} />

          {/* Icon with animation */}
          <span className={`
            relative flex-shrink-0 transition-all duration-300
            ${isActive || location.pathname === menu.path ? 'scale-110' : 'scale-100'}
            group-hover:scale-110
          `}>
            {getIcon(menu.icon || 'Folder')}
          </span>

          <span className="relative">{menu.label}</span>

          {/* Badge for new items (optional) */}
          {menu.label === 'Dashboard' && (
            <span className="relative ml-auto px-2 py-0.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-300 rounded-full">
              NEW
            </span>
          )}
        </NavLink>
      </motion.div>
    );
  };

  const renderParentMenu = (menu, index) => {
    const isOpen = openMenus[menu.label];
    const isHovered = hoveredItem === `parent-${menu.label}`;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="space-y-0.5"
      >
        <button
          onClick={() => toggleMenu(menu.label)}
          onMouseEnter={() => setHoveredItem(`parent-${menu.label}`)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`
            relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-sm font-medium transition-all duration-300
            text-gray-400 hover:text-white hover:bg-white/10
            group overflow-hidden
          `}
        >
          {/* Hover background */}
          <div className={`
            absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 
            rounded-xl transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} />

          <span className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            {getIcon(menu.icon || 'Folder')}
          </span>
          <span className="relative flex-1 text-left">{menu.label}</span>
          <span className="relative flex-shrink-0 text-gray-500 transition-transform duration-300">
            {isOpen ? (
              <MenuIcons.ChevronUp className="w-4 h-4" />
            ) : (
              <MenuIcons.ChevronDown className="w-4 h-4" />
            )}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="ml-4 space-y-0.5 border-l-2 border-gray-700/50 pl-3">
                {menu.children.map((child, childIndex) => {
                  const isChildActive = location.pathname === child.path;
                  const isChildHovered = hoveredItem === `child-${child.label}-${childIndex}`;

                  return (
                    <motion.div
                      key={childIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: childIndex * 0.03 }}
                    >
                      <NavLink
                        to={child.path}
                        onMouseEnter={() => setHoveredItem(`child-${child.label}-${childIndex}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={({ isActive: isNavActive }) => {
                          const active = isNavActive || isChildActive;
                          return `
                            relative flex items-center gap-3 px-3 py-2 rounded-lg
                            text-sm font-medium transition-all duration-300
                            ${active
                              ? 'text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 shadow-md shadow-blue-500/20'
                              : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                            }
                            group overflow-hidden
                          `;
                        }}
                      >
                        {/* Child active indicator */}
                        <div className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 
                          bg-gradient-to-b from-blue-400 to-purple-400 
                          transition-all duration-300
                          ${isChildActive || location.pathname === child.path ? 'opacity-100' : 'opacity-0'}
                        `} />

                        <span className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                          {getIcon(child.icon || 'Folder', "w-4 h-4")}
                        </span>
                        <span className="relative text-xs">{child.label}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: open ? 0 : -280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`
        fixed lg:relative z-40
        w-72 h-screen overflow-y-auto overflow-x-hidden
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        border-r border-gray-700/50
        shadow-2xl shadow-gray-900/50
        scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent
        ${open ? 'block' : 'hidden lg:block'}
      `}
    >
      {/* Header with Brogym Logo */}
      <div className="relative p-6 border-b border-gray-700/50 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3">
            {/* Logo Brogym - Menggunakan JPG */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 flex-shrink-0 bg-gray-800"
            >
              {!logoError ? (
                <img 
                  src={brogymLogo} 
                  alt="Brogym" 
                  className="w-full h-full object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                // Fallback jika gambar gagal load
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  B
                </div>
              )}
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                BroGym
              </h1>
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-gray-400 font-medium">{role}</p>
              </div>
            </div>
          </div>

          {/* Version badge */}
          <div className="absolute top-0 right-0 px-2 py-0.5 text-[10px] font-bold bg-white/5 text-gray-400 rounded-lg border border-gray-700/50">
            v1.0
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {menus.map((menu, index) =>
          menu.isParent ? renderParentMenu(menu, index) : renderMenuItem(menu, index)
        )}
      </nav>

      {/* Footer with animated border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="relative p-4 border-t border-gray-700/50">
          {/* Animated progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/20">
                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                Online
              </span>
            </div>
            <span className="text-gray-600">
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;