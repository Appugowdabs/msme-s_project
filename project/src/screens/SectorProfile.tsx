import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, User, Award, AlertCircle, Gauge, Truck, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/navigation/BottomNavigation';

const SectorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sectors, user } = useAppContext();
  const [sector, setSector] = useState<any>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (id && sectors) {
      const foundSector = sectors.find(s => s.id === id);
      if (foundSector) {
        setSector(foundSector);
      }
    }
  }, [id, sectors]);

  if (!sector) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const buttons = [
    { id: 'profile', icon: <User size={20} />, label: 'My Profile', route: '#' },
    { id: 'rewards', icon: <Award size={20} />, label: 'Rewards & Coupons', route: '/rewards' },
    { id: 'fines', icon: <AlertCircle size={20} />, label: 'Fines & Warnings', route: '/fines' },
    { id: 'score', icon: <Gauge size={20} />, label: 'Sustainability Score', route: '#' },
    { id: 'vendors', icon: <Truck size={20} />, label: 'Disposal Vendors', route: '/vendors' },
    { id: 'health', icon: <Heart size={20} />, label: 'Health', route: '/health' },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-neutral-100 dark:bg-neutral-900 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.header
        className="relative h-48 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img 
          src={sector.image} 
          alt={sector.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <motion.button
          className="absolute top-4 left-4 bg-white dark:bg-neutral-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-10"
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.95 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <motion.div
          className="absolute bottom-0 left-0 w-full p-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-poppins font-semibold">{sector.name}</h1>
          {user?.businessName && (
            <p className="text-sm opacity-90">{user.businessName}</p>
          )}
        </motion.div>
      </motion.header>
      
      {/* Content */}
      <div className="px-4 py-6">
        {/* Description */}
        <motion.p
          className="text-neutral-700 dark:text-neutral-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {sector.description}
        </motion.p>
        
        {/* Button Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {buttons.map((button) => (
            <motion.button
              key={button.id}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={() => navigate(button.route)}
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500">
                {button.icon}
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{button.label}</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Sustainability Tips */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-poppins font-semibold mb-4 text-neutral-800 dark:text-white">Sustainability Tips</h2>
          
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex space-x-4 pb-4">
              <div className="flex-shrink-0 w-64 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg" 
                  alt="Sustainable Manufacturing" 
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-primary-600 dark:text-primary-400">Reduce Energy Usage</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Schedule equipment maintenance regularly to ensure optimal energy efficiency.</p>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-64 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg" 
                  alt="Waste Management" 
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-primary-600 dark:text-primary-400">Waste Segregation</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Separate waste into organic, recyclable, and hazardous to maximize recycling potential.</p>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-64 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg" 
                  alt="Green Materials" 
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-primary-600 dark:text-primary-400">Sustainable Sourcing</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Use locally-sourced, biodegradable materials to reduce your carbon footprint.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default SectorProfile;