import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, MapPin, Calendar, Clock, Phone, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockHealthTips, mockHealthCamps } from '../data/mockData';
import BottomNavigation from '../components/navigation/BottomNavigation';

const HealthPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tips' | 'camps'>('tips');
  
  return (
    <motion.div 
      className="min-h-screen bg-neutral-100 dark:bg-neutral-900 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.header
        className="bg-primary-500 text-white p-4 relative"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center">
          <motion.button
            className="mr-3"
            onClick={() => navigate(-1)}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <div className="flex items-center">
            <Heart size={20} className="mr-2" />
            <h1 className="text-xl font-poppins font-bold">Health</h1>
          </div>
        </div>
      </motion.header>
      
      {/* Tabs */}
      <motion.div
        className="bg-white dark:bg-neutral-800 p-1 mx-4 mt-4 rounded-full shadow flex"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={`flex-1 py-2 rounded-full text-center font-medium text-sm transition-all ${
            activeTab === 'tips'
              ? 'bg-primary-500 text-white'
              : 'text-neutral-700 dark:text-neutral-300'
          }`}
          onClick={() => setActiveTab('tips')}
        >
          Safety Tips
        </button>
        <button
          className={`flex-1 py-2 rounded-full text-center font-medium text-sm transition-all ${
            activeTab === 'camps'
              ? 'bg-primary-500 text-white'
              : 'text-neutral-700 dark:text-neutral-300'
          }`}
          onClick={() => setActiveTab('camps')}
        >
          Health Camps
        </button>
      </motion.div>
      
      {/* Content based on active tab */}
      <div className="px-4 py-6">
        {activeTab === 'tips' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-poppins font-semibold text-neutral-800 dark:text-white mb-4">
              Safety Tips for MSMEs
            </h2>
            
            <div className="space-y-4">
              {mockHealthTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * parseInt(tip.id) }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 h-40 md:h-auto">
                      <img 
                        src={tip.image}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4 md:w-2/3">
                      <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">{tip.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                        {tip.description}
                      </p>
                      <button className="mt-3 text-sm text-primary-600 dark:text-primary-400 font-medium flex items-center">
                        Learn more <ArrowRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'camps' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-xl font-poppins font-semibold text-neutral-800 dark:text-white mb-4">
              Upcoming Health Camps
            </h2>
            
            <div className="space-y-4">
              {mockHealthCamps.map((camp) => (
                <motion.div
                  key={camp.id}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden p-4"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * parseInt(camp.id) }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mr-3 flex-shrink-0">
                      <Heart size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">{camp.title}</h3>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                          <MapPin size={14} className="mr-2 text-error-500" />
                          {camp.location}
                        </div>
                        
                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar size={14} className="mr-2 text-primary-500" />
                          {new Date(camp.date).toLocaleDateString('en-IN', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        
                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                          <Clock size={14} className="mr-2 text-secondary-500" />
                          {camp.time}
                        </div>
                        
                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                          <Phone size={14} className="mr-2 text-primary-500" />
                          {camp.contact}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-3">
                        <button className="btn btn-primary flex-1 py-2">
                          Register
                        </button>
                        <button className="btn btn-outline flex-1 py-2">
                          <Share2 size={16} className="mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="btn btn-secondary">
                View All Health Camps
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

// Arrow Right icon component
const ArrowRight: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export default HealthPage;