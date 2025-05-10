import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Award, Gift, Star, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/navigation/BottomNavigation';

const RewardsPage: React.FC = () => {
  const { rewards, user } = useAppContext();
  const navigate = useNavigate();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const toggleRewardDetails = (rewardId: string) => {
    setSelectedReward(selectedReward === rewardId ? null : rewardId);
  };

  return (
    <motion.div 
      className="min-h-screen bg-neutral-100 dark:bg-neutral-900 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.header
        className="bg-secondary-500 text-white p-4 relative"
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
          
          <h1 className="text-xl font-poppins font-bold">Rewards & Coupons</h1>
        </div>
      </motion.header>
      
      {/* Sustainability Score */}
      <motion.section
        className="bg-white dark:bg-neutral-800 m-4 rounded-lg overflow-hidden shadow-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Green Score</h2>
            
            <div className="flex items-center">
              <motion.button
                onMouseEnter={() => setShowTooltip('score')}
                onMouseLeave={() => setShowTooltip(null)}
                className="relative"
              >
                <Info size={18} className="text-neutral-500" />
                
                {showTooltip === 'score' && (
                  <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-neutral-800 text-white text-xs rounded shadow-lg z-50">
                    Your Green Score measures your business's sustainability practices. Increase your score to unlock more rewards!
                  </div>
                )}
              </motion.button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mr-3">
              <Gauge size={20} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{user?.sustainabilityScore}/100 points</p>
                <p className="text-xs text-primary-500">Good</p>
              </div>
              
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-500"
                  style={{ width: `${user?.sustainabilityScore}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${user?.sustainabilityScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="text-center">
              <p className="text-xs text-neutral-500">Current Rank</p>
              <p className="font-medium">Silver</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-neutral-500">Available Points</p>
              <p className="font-medium">750</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-neutral-500">Next Rank</p>
              <p className="font-medium">Gold (850 pts)</p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Rewards List */}
      <motion.section
        className="px-4 my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-poppins font-semibold text-neutral-800 dark:text-white">Available Rewards</h2>
          
          <div className="flex items-center">
            <button className="text-secondary-500 text-sm font-medium">
              See All <ChevronRight size={16} className="inline" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {rewards.map((reward) => (
            <motion.div
              key={reward.id}
              className={`bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden ${selectedReward === reward.id ? 'border-2 border-secondary-500' : ''}`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleRewardDetails(reward.id)}
              >
                <div className="flex items-center space-x-3">
                  {reward.image ? (
                    <img src={reward.image} alt={reward.title} className="w-16 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center text-secondary-500">
                      <Award size={24} />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium">{reward.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                      {reward.description}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star size={14} className="text-warning-500 fill-warning-500" />
                      <span className="text-xs ml-1">{reward.points} points required</span>
                    </div>
                  </div>
                </div>
                
                <ChevronRight size={20} className={`transition-transform ${selectedReward === reward.id ? 'rotate-90' : ''}`} />
              </div>
              
              {/* Expanded details */}
              {selectedReward === reward.id && (
                <motion.div
                  className="p-4 pt-0 border-t border-neutral-200 dark:border-neutral-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                    {reward.description}
                  </p>
                  
                  {reward.expiryDate && (
                    <p className="text-xs text-neutral-500 mb-3">
                      Valid until {new Date(reward.expiryDate).toLocaleDateString('en-IN')}
                    </p>
                  )}
                  
                  <button 
                    className={`btn w-full ${user?.sustainabilityScore && user.sustainabilityScore >= reward.points ? 'btn-primary' : 'btn-outline opacity-70'}`}
                    disabled={!user?.sustainabilityScore || user.sustainabilityScore < reward.points}
                  >
                    <Gift size={16} />
                    {user?.sustainabilityScore && user.sustainabilityScore >= reward.points ? 'Redeem Now' : `Need ${reward.points - (user?.sustainabilityScore || 0)} more points`}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Encouraging Message */}
      <motion.section
        className="px-4 my-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 rounded-lg p-4 border border-primary-200 dark:border-primary-700">
          <h3 className="text-lg font-medium text-primary-700 dark:text-primary-300 mb-1">Great Progress!</h3>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            You've saved approximately 30kg of plastic waste and reduced your carbon footprint by 15% this month!
          </p>
        </div>
      </motion.section>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

// Gauge icon component
const Gauge: React.FC<{ size: number }> = ({ size }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M12 12l-3 -2" />
    <path d="M12 7l0 -1" />
    <path d="M17 12l1 0" />
    <path d="M12 17l0 1" />
    <path d="M7 12l-1 0" />
  </svg>
);

export default RewardsPage;