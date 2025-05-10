import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Info, LogIn, UserPlus, Lock, Mail, Phone, Facebook, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showInfoTooltip, setShowInfoTooltip] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login, isLoading } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      try {
        await login(email, password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      // Mock signup success
      try {
        await login(email, password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }
  };

  const handleGuestLogin = () => {
    navigate('/dashboard');
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

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      <motion.div
        className="z-10 w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
          <Leaf size={32} className="text-primary-400 mr-2" />
          <h1 className="text-3xl font-poppins font-bold text-white">Jugaad Guru</h1>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 font-medium text-center border-b-2 transition-all ${isLogin ? 'border-primary-500 text-primary-500' : 'border-transparent text-neutral-500'}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 font-medium text-center border-b-2 transition-all ${!isLogin ? 'border-primary-500 text-primary-500' : 'border-transparent text-neutral-500'}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center">
                    <Mail size={20} className="text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-10" 
                    />
                  </div>
                </div>
                
                {!isLogin && (
                  <div className="relative">
                    <div className="flex items-center">
                      <Phone size={20} className="text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field pl-10" 
                      />
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <div className="flex items-center">
                    <Lock size={20} className="text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password" 
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-10" 
                    />
                  </div>
                </div>
              </div>
              
              {isLogin && (
                <div className="mt-2 text-right">
                  <a href="#" className="text-sm text-secondary-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              )}
              
              <motion.button
                type="submit"
                className="btn btn-primary w-full mt-6 relative"
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                onMouseEnter={() => setShowInfoTooltip('login')}
                onMouseLeave={() => setShowInfoTooltip(null)}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {isLogin ? <LogIn size={18} className="mr-2" /> : <UserPlus size={18} className="mr-2" />}
                    {isLogin ? 'Login' : 'Sign Up'}
                    <Info size={16} className="ml-2 text-white opacity-70" />
                  </span>
                )}
                {showInfoTooltip === 'login' && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Secure login with email/phone
                  </div>
                )}
              </motion.button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">or continue with</p>
              
              <div className="mt-4 flex justify-center space-x-4">
                <motion.button
                  className="w-12 h-12 rounded-full bg-[#4267B2] text-white flex items-center justify-center"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setShowInfoTooltip('facebook')}
                  onMouseLeave={() => setShowInfoTooltip(null)}
                >
                  <Facebook size={20} />
                  {showInfoTooltip === 'facebook' && (
                    <div className="absolute top-full mt-2 bg-neutral-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      Login with Facebook
                    </div>
                  )}
                </motion.button>
                <motion.button
                  className="w-12 h-12 rounded-full bg-white border border-neutral-300 text-red-500 flex items-center justify-center"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setShowInfoTooltip('google')}
                  onMouseLeave={() => setShowInfoTooltip(null)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                    <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
                    <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.6095 17.5455 13.3575 18 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                  </svg>
                  {showInfoTooltip === 'google' && (
                    <div className="absolute top-full mt-2 bg-neutral-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      Login with Google
                    </div>
                  )}
                </motion.button>
              </div>
              
              <motion.button
                className="mt-6 text-sm text-secondary-500 flex items-center justify-center mx-auto hover:underline"
                onClick={handleGuestLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setShowInfoTooltip('guest')}
                onMouseLeave={() => setShowInfoTooltip(null)}
              >
                Continue as Guest
                <ArrowRight size={14} className="ml-1" />
                {showInfoTooltip === 'guest' && (
                  <div className="absolute top-full mt-2 bg-neutral-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Try without an account
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <motion.p 
          variants={itemVariants} 
          className="text-center text-white text-sm mt-6"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AuthScreen;