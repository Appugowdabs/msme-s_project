import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Send, Loader2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const VoiceAssistant: React.FC = () => {
  const { assistantActive, toggleAssistant } = useAppContext();
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', text: string}>>([
    { type: 'assistant', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    
    // Simulate processing
    setIsProcessing(true);
    setInput('');
    
    // Simulate AI response after delay
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('sustainability')) {
        response = 'For better sustainability in your business, consider switching to LED lighting, installing rainwater harvesting, and using eco-friendly packaging materials.';
      } else if (input.toLowerCase().includes('fine') || input.toLowerCase().includes('penalty')) {
        response = 'To avoid fines, ensure proper waste segregation, maintain compliance records, and regularly check for updates on environmental regulations.';
      } else if (input.toLowerCase().includes('reward') || input.toLowerCase().includes('points')) {
        response = 'You can earn more sustainability points by reducing water consumption, switching to renewable energy, and participating in community clean-up events.';
      } else if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        response = 'Hello! I\'m here to help with sustainability practices, compliance guidance, and waste management solutions. What would you like to know?';
      } else {
        response = 'I understand you need assistance. Would you like tips on sustainability practices, information about rewards, or guidance on avoiding compliance penalties?';
      }
      
      setMessages(prev => [...prev, { type: 'assistant', text: response }]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real app, this would process and transcribe the audio
      setInput('How can I improve my sustainability score?');
    } else {
      setIsRecording(true);
    }
  };

  return (
    <>
      {/* Floating button when closed */}
      {!assistantActive && (
        <motion.button
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg z-20"
          onClick={toggleAssistant}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mic size={24} />
        </motion.button>
      )}
      
      {/* Assistant panel when open */}
      <AnimatePresence>
        {assistantActive && (
          <motion.div
            className="fixed inset-x-0 bottom-16 mx-auto max-w-md bg-white dark:bg-neutral-800 rounded-t-xl shadow-lg z-20 max-h-[70vh] flex flex-col"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500 mr-3">
                  <Mic size={20} />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold">Voice Assistant</h3>
                  <p className="text-xs text-neutral-500">Ask me anything about sustainability</p>
                </div>
              </div>
              
              <button 
                onClick={toggleAssistant}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary-500 text-white rounded-br-none'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-white rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-200 dark:bg-neutral-700 rounded-lg p-3 flex items-center space-x-2 text-neutral-800 dark:text-white rounded-bl-none">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex">
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isRecording ? "Listening..." : "Type a message..."}
                    className="input-field pr-10"
                    disabled={isRecording}
                  />
                  <button 
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isRecording ? 'bg-error-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white'}`}
                    onClick={toggleRecording}
                  >
                    <Mic size={16} />
                  </button>
                </div>
                
                <button 
                  className="ml-2 btn btn-primary w-10 h-10 rounded-full p-0 flex items-center justify-center"
                  onClick={handleSendMessage}
                  disabled={!input.trim() && !isRecording}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;