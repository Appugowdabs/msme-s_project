import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Bell, User, BookOpen, Mic, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/navigation/BottomNavigation';
import Notification from '../components/common/Notification';

const Dashboard: React.FC = () => {
  const { user, businessOwners, sectors } = useAppContext();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [currentOwnerIndex, setCurrentOwnerIndex] = useState(0);

  // Use intersection observer for animations
  const [sectorRef, sectorInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [storiesRef, storiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSectorClick = (sectorId: string) => {
    navigate(`/sector/${sectorId}`);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const nextOwner = () => {
    setCurrentOwnerIndex((prev) => 
      prev === businessOwners.length - 1 ? 0 : prev + 1
    );
  };

  const prevOwner = () => {
    setCurrentOwnerIndex((prev) => 
      prev === 0 ? businessOwners.length - 1 : prev - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const currentOwner = businessOwners[currentOwnerIndex];

  return (
    <motion.div 
      className="min-h-screen bg-neutral-100 dark:bg-neutral-900 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.header 
        className="bg-primary-500 text-white p-4 shadow-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-poppins font-bold">Jugaad Guru</h1>
            <p className="text-sm opacity-90">Welcome, {user?.name || 'Guest'}</p>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="relative"
              onClick={toggleNotification}
            >
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full overflow-hidden"
            >
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary-500 flex items-center justify-center">
                  <User size={20} />
                </div>
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-secondary-500 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => navigate('/health')}
            >
              <BookOpen size={18} />
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      {/* Notification Popup */}
      {showNotification && (
        <Notification 
          title="Warning: Exceeding Waste Limit"
          message="You are approaching the fine limit for plastic waste. Consider switching to eco-friendly alternatives."
          onClose={toggleNotification}
        />
      )}
      
      {/* Business Owner Stories Carousel */}
      <motion.section
        ref={storiesRef}
        className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-md mx-4 my-4 p-6 overflow-hidden"
        initial="hidden"
        animate={storiesInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-xl font-poppins font-semibold mb-4 text-neutral-800 dark:text-white"
          variants={itemVariants}
        >
          Success Stories
        </motion.h2>
        
        <div className="relative">
          <motion.div
            className="flex items-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={prevOwner}
              className="absolute left-0 z-10 bg-white dark:bg-neutral-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex flex-col md:flex-row items-center gap-4 px-10">
              <img 
                src={currentOwner.image} 
                alt={currentOwner.name} 
                className="w-20 h-20 object-cover rounded-full border-2 border-primary-500"
              />
              <div>
                <h3 className="font-poppins font-medium text-lg">{currentOwner.name}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400">{currentOwner.business}</p>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{currentOwner.story}</p>
              </div>
            </div>
            
            <button 
              onClick={nextOwner}
              className="absolute right-0 z-10 bg-white dark:bg-neutral-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Sectors Grid */}
      <motion.section 
        ref={sectorRef}
        className="px-4 my-6"
        initial="hidden"
        animate={sectorInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-xl font-poppins font-semibold mb-4 text-neutral-800 dark:text-white"
          variants={itemVariants}
        >
          Business Sectors
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {sectors.map((sector) => (
            <motion.div
              key={sector.id}
              className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSectorClick(sector.id)}
            >
              <div 
                className="h-24 bg-cover bg-center"
                style={{ backgroundImage: `url(${sector.image})` }}
              />
              <div className="p-3">
                <h3 className="font-poppins font-medium text-sm">{sector.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      {/* Quick Tips */}
      <motion.section
        className="px-4 my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-poppins font-semibold mb-4 text-neutral-800 dark:text-white">Sustainability Tips</h2>
        
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex space-x-4 pb-4">
            <div className="flex-shrink-0 w-64 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md p-4">
              <h3 className="font-medium text-primary-600 dark:text-primary-400">Switch to LED Lighting</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Reduce energy costs by up to 80% and lower your carbon footprint.</p>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md p-4">
              <h3 className="font-medium text-primary-600 dark:text-primary-400">Collect Rainwater</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Simple systems can save thousands of liters annually for your business.</p>
            </div>
            
            <div className="flex-shrink-0 w-64 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md p-4">
              <h3 className="font-medium text-primary-600 dark:text-primary-400">Avoid Single-Use Plastics</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Switch to reusable or biodegradable alternatives to avoid fines.</p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default Dashboard;