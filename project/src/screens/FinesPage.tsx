import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertCircle, AlertTriangle, Check, FileText, HelpCircle, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/navigation/BottomNavigation';
import { type Fine } from '../context/AppContext';

const FinesPage: React.FC = () => {
  const { fines, user } = useAppContext();
  const navigate = useNavigate();
  const [expandedFine, setExpandedFine] = useState<string | null>(null);
  const [showPolicyGuide, setShowPolicyGuide] = useState(false);
  
  const pendingFines = fines.filter(fine => fine.status === 'pending');
  const totalFineAmount = pendingFines.reduce((sum, fine) => sum + fine.amount, 0);
  const fineLimit = 25000; // Example fine limit
  const finePercentage = (totalFineAmount / fineLimit) * 100;
  
  const toggleFineDetails = (fineId: string) => {
    setExpandedFine(expandedFine === fineId ? null : fineId);
  };
  
  const togglePolicyGuide = () => {
    setShowPolicyGuide(!showPolicyGuide);
  };
  
  const getFineStatusColor = (status: Fine['status']) => {
    switch (status) {
      case 'pending': return 'text-error-500';
      case 'paid': return 'text-primary-500';
      case 'appealed': return 'text-warning-500';
      default: return 'text-neutral-500';
    }
  };
  
  const getFineStatusIcon = (status: Fine['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle size={16} />;
      case 'paid': return <Check size={16} />;
      case 'appealed': return <AlertTriangle size={16} />;
      default: return <HelpCircle size={16} />;
    }
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
        className="bg-error-500 text-white p-4 relative"
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
          
          <h1 className="text-xl font-poppins font-bold">Fines & Alerts</h1>
        </div>
      </motion.header>
      
      {/* Fine Limit Tracker */}
      <motion.section
        className="bg-white dark:bg-neutral-800 m-4 rounded-lg overflow-hidden shadow-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Fine Limit Tracker</h2>
            <button className="text-secondary-500">
              <HelpCircle size={18} />
            </button>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">
                Current: <span className="font-medium text-error-500">₹{totalFineAmount.toLocaleString()}</span>
              </p>
              <p className="text-sm">
                Limit: <span className="font-medium">₹{fineLimit.toLocaleString()}</span>
              </p>
            </div>
            
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${finePercentage > 75 ? 'bg-error-500' : finePercentage > 50 ? 'bg-warning-500' : 'bg-primary-500'}`}
                style={{ width: `${finePercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${finePercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              {finePercentage > 75 ? (
                <span className="text-error-500">Warning: You are approaching your fine limit! Take immediate action.</span>
              ) : finePercentage > 50 ? (
                <span className="text-warning-500">Caution: Consider addressing compliance issues soon.</span>
              ) : (
                <span className="text-primary-500">Good standing: Keep up the sustainable practices!</span>
              )}
            </p>
          </div>
        </div>
      </motion.section>
      
      {/* Fines List */}
      <motion.section
        className="px-4 my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-poppins font-semibold text-neutral-800 dark:text-white mb-4">Your Fines & Warnings</h2>
        
        <div className="space-y-4">
          {fines.map((fine) => (
            <motion.div
              key={fine.id}
              className={`bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden ${fine.status === 'pending' ? 'border-l-4 border-error-500' : fine.status === 'appealed' ? 'border-l-4 border-warning-500' : ''}`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleFineDetails(fine.id)}
              >
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{fine.title}</h3>
                    <span className={`ml-2 flex items-center text-xs ${getFineStatusColor(fine.status)}`}>
                      {getFineStatusIcon(fine.status)}
                      <span className="ml-1 capitalize">{fine.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {fine.description}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-neutral-500">
                    <span>Due: {new Date(fine.dueDate).toLocaleDateString('en-IN')}</span>
                    <span className="ml-4 font-medium text-sm text-error-500">₹{fine.amount.toLocaleString()}</span>
                  </div>
                </div>
                
                <ChevronLeft size={20} className={`transition-transform ${expandedFine === fine.id ? 'rotate-90' : '-rotate-90'}`} />
              </div>
              
              {/* Expanded details */}
              {expandedFine === fine.id && (
                <motion.div
                  className="p-4 pt-0 border-t border-neutral-200 dark:border-neutral-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {fine.status === 'pending' && (
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                      <button className="btn btn-primary flex-1">
                        <Check size={16} />
                        Pay Fine Now
                      </button>
                      <button className="btn btn-outline flex-1">
                        <AlertTriangle size={16} />
                        Appeal Decision
                      </button>
                    </div>
                  )}
                  
                  {fine.status === 'appealed' && (
                    <div className="bg-warning-50 dark:bg-warning-900 dark:bg-opacity-20 p-3 rounded-lg mb-3">
                      <p className="text-sm">Your appeal is under review. We'll notify you once a decision is made.</p>
                    </div>
                  )}
                  
                  {fine.status === 'paid' && (
                    <div className="bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 p-3 rounded-lg mb-3">
                      <p className="text-sm">This fine has been paid. Payment received on 15 Jun 2024.</p>
                    </div>
                  )}
                  
                  <button className="btn btn-secondary mt-3 w-full">
                    <FileText size={16} />
                    Learn How to Avoid This Fine
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Policy Guide */}
      <motion.section
        className="px-4 my-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className="w-full bg-secondary-50 dark:bg-secondary-900 dark:bg-opacity-20 p-4 rounded-lg border border-secondary-200 dark:border-secondary-800 flex items-center justify-between"
          onClick={togglePolicyGuide}
        >
          <div className="flex items-center">
            <FileText size={20} className="text-secondary-500 mr-2" />
            <span className="font-medium text-neutral-800 dark:text-white">Regulatory Policy Guide</span>
          </div>
          <ArrowUpRight size={18} className="text-secondary-500" />
        </button>
        
        {showPolicyGuide && (
          <motion.div
            className="mt-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 max-h-64 overflow-y-auto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-2">MSME Compliance Guidelines</h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-secondary-500">Waste Management</h4>
                <p className="text-neutral-700 dark:text-neutral-300">All businesses must segregate waste into biodegradable, non-biodegradable, and hazardous categories. Penalties apply for improper disposal.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-secondary-500">Plastic Usage</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Single-use plastic is banned. Businesses must switch to alternatives or face fines of ₹5,000 to ₹25,000 depending on the scale of violation.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-secondary-500">Water Conservation</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Businesses must implement water recycling systems. Wastage beyond permitted limits incurs penalties of ₹10,000.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-secondary-500">Energy Efficiency</h4>
                <p className="text-neutral-700 dark:text-neutral-300">Businesses are encouraged to use energy-efficient equipment. Tax benefits available for compliance.</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.section>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default FinesPage;