import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

const TelegramBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user', text: string }>>([
    { type: 'bot', text: 'Hello! I\'m your Jugaad Guru Telegram assistant. I can provide sustainability tips and suggest ways to improve your business. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    
    // Simulate processing
    setIsLoading(true);
    const userMessage = input;
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      let response;
      
      if (userMessage.toLowerCase().includes('energy') || userMessage.toLowerCase().includes('electricity')) {
        response = 'To save energy in your business, consider:\n1. Switching to LED lighting\n2. Using energy-efficient equipment\n3. Installing motion sensors\n4. Conducting an energy audit\n\nThese changes can reduce energy costs by up to 30%!';
      } else if (userMessage.toLowerCase().includes('packaging') || userMessage.toLowerCase().includes('plastic')) {
        response = 'For sustainable packaging alternatives:\n1. Paper or cardboard packaging\n2. Compostable bags made from corn starch\n3. Reusable containers with deposit system\n4. Biodegradable packaging made from sugarcane waste\n\nMany of our users report 15-20% cost savings after switching!';
      } else if (userMessage.toLowerCase().includes('water') || userMessage.toLowerCase().includes('saving')) {
        response = 'Water conservation tips:\n1. Install low-flow faucets and toilets\n2. Collect and reuse rainwater\n3. Fix leaks promptly\n4. Use water-efficient processes in manufacturing\n\nA textile business in Tirupur reduced water usage by 40% with these methods!';
      } else {
        response = 'I can help you with:\n- Energy saving tips\n- Sustainable packaging alternatives\n- Water conservation methods\n- Waste reduction strategies\n- Connecting with vendors\n\nWhat specific area would you like to improve in your business?';
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-20 left-4 w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center text-white shadow-lg z-20"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageSquare size={24} />
        )}
      </motion.button>
      
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-4 bottom-36 w-72 sm:w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg z-20 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="bg-[#0088cc] text-white p-3 flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare size={20} className="mr-2" />
                <h3 className="font-medium">Telegram Bot</h3>
              </div>
              <button onClick={toggleChat}>
                <X size={18} />
              </button>
            </div>
            
            <div className="h-80 overflow-y-auto p-3 bg-[#f0f2f5] dark:bg-neutral-900">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`mb-2 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs rounded-lg p-2 text-sm ${
                      message.type === 'user'
                        ? 'bg-[#dcf8c6] text-black rounded-br-none'
                        : 'bg-white dark:bg-neutral-800 text-black dark:text-white rounded-bl-none shadow'
                    }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-2">
                  <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 text-sm shadow rounded-bl-none">
                    <div className="flex items-center space-x-2">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-2 border-t border-neutral-200 dark:border-neutral-700 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 py-2 px-3 rounded-full bg-neutral-100 dark:bg-neutral-700 text-sm focus:outline-none focus:ring-1 focus:ring-[#0088cc]"
              />
              <button
                className="ml-2 w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TelegramBot;