import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

// Enhanced Icons
const Icons = {
  Disease: ({ className = "w-12 h-12" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
};

// Custom plugin for hover animation
const hoverPlugin = {
  id: 'hoverPlugin',

  beforeDraw(chart) {
    // Optional: Add glow effect on hover
  },

  afterDraw(chart) {
    const { ctx } = chart;

    ctx.save();

    // Additional styling can be added here

    ctx.restore();
  },
};

const DiseaseChart = ({ data = [], title = 'Distribusi Penyakit' }) => {
  const chartRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    console.log('DiseaseChart data:', data);
  }, [data]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.1,
      }
    }
  };

  const emptyVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        delay: 0.2,
      }
    }
  };

  if (data.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 p-6 transition-all duration-300 border border-gray-200 dark:border-gray-700"
        style={{ minHeight: '350px' }}
      >
        <motion.div
          variants={emptyVariants}
          className="flex flex-col items-center justify-center h-full py-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
            <Icons.Empty className="text-gray-300 dark:text-gray-600 relative z-10" />
          </div>
          <motion.p 
            className="mt-4 text-gray-500 dark:text-gray-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Belum ada data penyakit
          </motion.p>
          <motion.p 
            className="text-sm text-gray-400 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Data akan muncul setelah ada konsultasi
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  // Extended color palette with gradients
  const colorPalette = [
    { bg: 'rgba(239, 68, 68, 0.8)', border: 'rgba(239, 68, 68, 1)', gradient: 'from-red-500 to-red-600' },
    { bg: 'rgba(251, 191, 36, 0.8)', border: 'rgba(251, 191, 36, 1)', gradient: 'from-yellow-500 to-yellow-600' },
    { bg: 'rgba(52, 211, 153, 0.8)', border: 'rgba(52, 211, 153, 1)', gradient: 'from-green-500 to-emerald-500' },
    { bg: 'rgba(59, 130, 246, 0.8)', border: 'rgba(59, 130, 246, 1)', gradient: 'from-blue-500 to-blue-600' },
    { bg: 'rgba(139, 92, 246, 0.8)', border: 'rgba(139, 92, 246, 1)', gradient: 'from-purple-500 to-purple-600' },
    { bg: 'rgba(236, 72, 153, 0.8)', border: 'rgba(236, 72, 153, 1)', gradient: 'from-pink-500 to-pink-600' },
    { bg: 'rgba(14, 165, 233, 0.8)', border: 'rgba(14, 165, 233, 1)', gradient: 'from-sky-500 to-sky-600' },
    { bg: 'rgba(245, 158, 11, 0.8)', border: 'rgba(245, 158, 11, 1)', gradient: 'from-amber-500 to-amber-600' },
  ];

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((_, index) => colorPalette[index % colorPalette.length].bg),
        borderColor: data.map((_, index) => colorPalette[index % colorPalette.length].border),
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
          color: 'rgb(156, 163, 175)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(75, 85, 99, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: '600',
          family: 'Inter, sans-serif',
        },
        color: 'rgb(156, 163, 175)',
        padding: {
          bottom: 20,
        },
      },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    onHover: (event, chartElement) => {
      if (chartElement && chartElement.length > 0) {
        const index = chartElement[0].index;
        setActiveIndex(index);
        setIsHovered(true);
      } else {
        setActiveIndex(null);
        setIsHovered(false);
      }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 p-6 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActiveIndex(null); }}
    >
      {/* Decorative gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-pink-500/0 rounded-t-2xl" />
      
      {/* Header with animation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"
          >
            <Icons.Disease className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {title}
            </h3>
            <p className="text-xs text-gray-400">
              Total: {total} kasus
            </p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
        >
          {data.length} Jenis
        </motion.div>
      </div>

      {/* Chart container with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        {/* Central percentage display */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {total}
            </div>
            <div className="text-xs text-gray-400">Total</div>
          </motion.div>
        </div>

        <Pie ref={chartRef} options={options} data={chartData} plugins={[hoverPlugin]} />
      </motion.div>

      {/* Custom legend with percentages */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-200 dark:border-gray-700 pt-4"
      >
        {data.map((item, index) => {
          const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
          const colors = colorPalette[index % colorPalette.length];
          const isActive = activeIndex === index;
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-gray-100 dark:bg-gray-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
              }`}
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.gradient} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate transition-colors duration-200 ${
                  isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {item.label}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {item.value}
                </span>
                <span className="text-xs text-gray-400">
                  ({percentage}%)
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Animated corner accents */}
      <motion.div
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-blue-500/30"
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
        className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-purple-500/30"
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
  );
};

export default DiseaseChart;