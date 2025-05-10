import React from 'react';
import { motion } from 'framer-motion';
import { X, Bell } from 'lucide-react';

interface NotificationProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ title, message, onClose }) => {
  return (
    <motion.div
      className="fixed top-16 inset-x-0 mx-auto max-w-md z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="bg-white dark:bg-neutral-800 m-4 rounded-lg shadow-lg border-l-4 border-error-500 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Bell size={20} className="text-error-500" />
            </div>
            
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {message}
              </p>
              
              <div className="mt-3 flex space-x-2">
                <button
                  className="rounded bg-error-50 dark:bg-error-900 dark:bg-opacity-20 px-2 py-1 text-xs font-medium text-error-600 dark:text-error-400"
                  onClick={onClose}
                >
                  View Details
                </button>
                <button
                  className="rounded bg-neutral-100 dark:bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400"
                  onClick={onClose}
                >
                  Dismiss
                </button>
              </div>
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <button
                className="rounded-md bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 focus:outline-none"
                onClick={onClose}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Notification;