import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BarChart2, Award, AlertTriangle, Film, Mic } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  const navItems = [
    { path: '/dashboard', icon: <Home size={24} />, label: 'Home' },
    { path: '/rewards', icon: <Award size={24} />, label: 'Rewards' },
    { path: '/reels', icon: <Film size={24} />, label: 'Reels' },
    { path: '/fines', icon: <AlertTriangle size={24} />, label: 'Alerts' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/dashboard' && currentPath === '/dashboard') return true;
    if (path !== '/dashboard' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-lg rounded-t-xl z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => (
          <motion.button
            key={item.path}
            className={`flex flex-col items-center justify-center rounded-full w-14 h-14 ${
              isActive(item.path) ? 'text-primary-500' : 'text-neutral-500'
            }`}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ y: -2 }}
          >
            {isActive(item.path) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                {item.icon}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                  layoutId="bottomNavIndicator"
                />
              </motion.div>
            ) : (
              item.icon
            )}
            <span className="text-[10px] mt-1">{item.label}</span>
          </motion.button>
        ))}
        
        {/* Middle floating mic button */}
        <motion.button
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mic size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BottomNavigation;