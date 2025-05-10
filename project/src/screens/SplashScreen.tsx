import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SplashScreen: React.FC = () => {
  // Background images for different sectors
  const sectorBackgrounds = [
    'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg', // Manufacturing
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',   // F&B
    'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg', // Textile
    'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',   // Recycling
    'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg', // Agriculture
    'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg'  // Retail
  ];
  
  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        backgroundImage: `url(${sectorBackgrounds[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <motion.div
        className="z-10 flex flex-col items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="flex items-center justify-center mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Leaf size={48} className="text-primary-500" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-poppins font-bold text-white mb-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Jugaad Guru
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white opacity-90 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sustainability with svalpa jugaad
        </motion.p>
        
        <motion.div 
          className="mt-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 10, 0] }}
          transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        >
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;