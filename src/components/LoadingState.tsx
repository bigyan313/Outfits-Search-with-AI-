import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingState: React.FC = () => {
  const [currentLog, setCurrentLog] = useState(0);
  
  const searchLogs = [
    "Analyzing weather patterns...",
    "Scanning fashion trends...",
    "Matching style preferences...",
    "Curating outfit combinations...",
    "Searching top brands...",
    "Optimizing for comfort and style...",
    "Finalizing recommendations..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog(prev => (prev + 1) % searchLogs.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const particles = [
    { color: 'rgb(34, 211, 238)', size: 12 }, // Cyan
    { color: 'rgb(129, 140, 248)', size: 16 }, // Indigo
    { color: 'rgb(244, 114, 182)', size: 14 }, // Pink
    { color: 'rgb(52, 211, 153)', size: 18 }, // Green
    { color: 'rgb(251, 146, 60)', size: 10 }, // Orange
    { color: 'rgb(139, 92, 246)', size: 15 }, // Purple
    { color: 'rgb(236, 72, 153)', size: 13 }, // Hot Pink
    { color: 'rgb(45, 212, 191)', size: 17 }, // Teal
    { color: 'rgb(221, 156, 80)', size: 11 }, // Orange
    { color: 'rgb(149, 99, 246)', size: 15 }, // Purple
    { color: 'rgb(216, 73, 113)', size: 13 }, // Hot Pink
    { color: 'rgb(55, 216, 111)', size: 17 }, // Teal
  ];

  return (
    <div className="bg-white p-8 flex flex-col items-center justify-center text-center h-[calc(100vh-8rem)]">
      <div className="relative w-48 h-48 mb-8">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              clipPath: index % 2 === 0 
                ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' // Diamond
                : 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            animate={{
              x: [
                `${Math.sin(index) * 60}px`,
                `${Math.cos(index) * 40}px`,
                `${Math.sin(index + 2) * 50}px`
              ],
              y: [
                `${Math.cos(index) * 40}px`,
                `${Math.sin(index) * 60}px`,
                `${Math.cos(index + 2) * 50}px`
              ],
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.25, 0.5, 0.75, 1],
              delay: index * 0.01
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, #22d3ee, #818cf8, #f472b6, #34d399, #fb923c, #8b5cf6, #ec4899, #2dd4bf, #22d3ee)',
            clipPath: 'circle(40% at center)',
            mixBlendMode: 'screen',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="space-y-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          key={currentLog}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="font-mono text-sm text-gray-600"
        >
          {searchLogs[currentLog]}
        </motion.div>
        
        <div className="flex justify-center space-x-1">
          {searchLogs.map((_, index) => (
            <motion.div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${index === currentLog ? 'bg-black' : 'bg-gray-200'}`}
              animate={index === currentLog ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-light mb-3">
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% auto',
          }}
        >
          Planning your travel wardrobe...
        </motion.span>
      </h3>
      
      <p className="text-gray-600 max-w-md font-light">
        Curating outfits using real-time weather data and trending styles for any occasion, effortlessly.
      </p>
    </div>
  );
};

export default LoadingState;