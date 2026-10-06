import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Enhanced Icons
const Icons = {
  Chart: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Empty: ({ className = "w-16 h-16" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
  TrendingUp: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  TrendingDown: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
};

const MonthlyConsultationChart = ({ data = [], title = 'Konsultasi Bulanan' }) => {
  const chartRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Log data untuk debug
  useEffect(() => {
    console.log('MonthlyConsultationChart data:', data);
  }, [data]);

  // Calculate statistics
  const monthlyData = data.length > 0 ? data : Array(12).fill(0);
  const total = monthlyData.reduce((sum, val) => sum + val, 0);
  const average = total > 0 ? (total / monthlyData.filter(v => v > 0).length).toFixed(1) : 0;
  const max = Math.max(...monthlyData);
  const maxIndex = monthlyData.indexOf(max);
  const trend = monthlyData.length > 1 ? 
    (monthlyData[monthlyData.length - 1] - monthlyData[monthlyData.length - 2]) : 0;

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

  const statVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }
    })
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  if (data.length === 0 || total === 0) {
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
            Belum ada data konsultasi
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

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: 'Jumlah Konsultasi',
        data: monthlyData,
        backgroundColor: monthlyData.map((value, index) => {
          const intensity = value > 0 ? 0.6 + (value / max) * 0.4 : 0.3;
          if (index === maxIndex) {
            return `rgba(139, 92, 246, ${intensity})`;
          }
          return `rgba(59, 130, 246, ${intensity})`;
        }),
        borderColor: monthlyData.map((value, index) => {
          if (index === maxIndex) {
            return 'rgba(139, 92, 246, 1)';
          }
          return 'rgba(59, 130, 246, 1)';
        }),
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: monthlyData.map((value, index) => {
          if (index === maxIndex) {
            return 'rgba(139, 92, 246, 0.9)';
          }
          return 'rgba(59, 130, 246, 0.9)';
        }),
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
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
            return `Konsultasi: ${context.parsed.y}`;
          },
          afterBody: function(tooltipItems) {
            const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
            return `Total: ${total}`;
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 11,
          },
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgb(156, 163, 175)',
        },
      },
    },
    animation: {
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-indigo-500/50 to-purple-500/0 rounded-t-2xl" />
      
      {/* Header with statistics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"
          >
            <Icons.Chart className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {title}
            </h3>
            <p className="text-xs text-gray-400">
              Total: {total} konsultasi
            </p>
          </div>
        </div>
        
        {/* Statistics badges */}
        <div className="flex flex-wrap items-center gap-2">
          <motion.div
            custom={0}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center gap-1"
          >
            <span>📊</span>
            Rata-rata: {average}
          </motion.div>
          <motion.div
            custom={1}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
              trend >= 0 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
            }`}
          >
            {trend >= 0 ? <Icons.TrendingUp className="w-3 h-3" /> : <Icons.TrendingDown className="w-3 h-3" />}
            {trend >= 0 ? '+' : ''}{trend}
          </motion.div>
          <motion.div
            custom={2}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full text-xs font-medium text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 flex items-center gap-1"
          >
            <span>🏆</span>
            Tertinggi: {max}
          </motion.div>
        </div>
      </div>

      {/* Chart container with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <Bar ref={chartRef} options={options} data={chartData} />
      </motion.div>

      {/* Custom legend with month labels */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4"
      >
        {monthlyData.map((value, index) => {
          const isActive = activeIndex === index;
          const isMax = value === max && value > 0;
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all duration-300 ${
                isActive ? 'bg-gray-100 dark:bg-gray-700/50' : ''
              } ${isMax ? 'border border-purple-200 dark:border-purple-800' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full ${
                isMax ? 'bg-purple-500' : 'bg-blue-500'
              }`} />
              <span className={`text-xs font-medium ${
                isMax ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {monthNames[index]}
              </span>
              <span className={`text-xs font-semibold ${
                isMax ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {value}
              </span>
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

export default MonthlyConsultationChart;