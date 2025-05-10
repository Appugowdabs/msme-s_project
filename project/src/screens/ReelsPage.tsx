import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, ChevronLeft, Info, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/navigation/BottomNavigation';

const ReelsPage: React.FC = () => {
  const { reels } = useAppContext();
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [muted, setMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  
  const handleLike = (reelId: string) => {
    setLiked(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };
  
  const handleScroll = (event: React.WheelEvent) => {
    if (event.deltaY > 0 && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(prev => prev + 1);
    } else if (event.deltaY < 0 && currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1);
    }
  };
  
  const toggleMute = () => {
    setMuted(!muted);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const currentReel = reels[currentReelIndex];

  return (
    <motion.div 
      className="fixed inset-0 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onWheel={handleScroll}
    >
      {/* Back Button */}
      <motion.button
        className="absolute top-4 left-4 z-50 text-white"
        onClick={() => navigate(-1)}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={28} />
      </motion.button>
      
      {/* Reel Video */}
      <div className="relative h-full w-full">
        <img 
          src={currentReel.thumbnailUrl}
          alt={currentReel.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Video would be here in a real implementation */}
        {/* <video
          ref={el => videoRefs.current[currentReel.id] = el}
          src={currentReel.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={muted}
          autoPlay
        /> */}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
        
        {/* Content */}
        <div className="absolute bottom-20 left-0 right-0 p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <img 
              src={currentReel.authorImage}
              alt={currentReel.author}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <div>
              <p className="font-medium">{currentReel.author}</p>
              <p className="text-xs opacity-80">Business Owner</p>
            </div>
          </div>
          
          <h2 className="text-lg font-semibold mb-1">{currentReel.title}</h2>
          <p className="text-sm opacity-90">{currentReel.description}</p>
        </div>
        
        {/* Interaction buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="flex flex-col items-center"
            onClick={() => handleLike(currentReel.id)}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <Heart 
                size={28} 
                className={liked[currentReel.id] ? "text-error-500 fill-error-500" : "text-white"} 
              />
            </div>
            <span className="text-xs text-white mt-1">{(liked[currentReel.id] ? currentReel.likes + 1 : currentReel.likes).toLocaleString()}</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="flex flex-col items-center"
            onClick={toggleComments}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <MessageCircle size={28} className="text-white" />
            </div>
            <span className="text-xs text-white mt-1">{currentReel.comments.toLocaleString()}</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="flex flex-col items-center"
          >
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <Share2 size={28} className="text-white" />
            </div>
            <span className="text-xs text-white mt-1">Share</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="bg-black bg-opacity-50 rounded-full p-2"
            onClick={toggleMute}
          >
            {muted ? (
              <VolumeX size={28} className="text-white" />
            ) : (
              <Volume2 size={28} className="text-white" />
            )}
          </motion.button>
        </div>
        
        {/* Progress indicator */}
        <div className="absolute top-14 left-0 right-0 flex px-4">
          {reels.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 bg-white mr-1 flex-1 rounded-full ${idx === currentReelIndex ? 'opacity-100' : 'opacity-40'}`}
            />
          ))}
        </div>
        
        {/* Info overlay */}
        <motion.button
          className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
          whileTap={{ scale: 0.95 }}
        >
          <Info size={20} className="text-white" />
        </motion.button>
      </div>
      
      {/* Comments Sheet */}
      {showComments && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 rounded-t-2xl p-4 z-20"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-4" />
          
          <h3 className="text-lg font-semibold mb-4">Comments ({currentReel.comments})</h3>
          
          <div className="space-y-4 max-h-[40vh] overflow-y-auto">
            <div className="flex items-start space-x-2">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Amitabh Singh</p>
                <p className="text-sm">This is so helpful! I've been trying to reduce waste in my manufacturing unit.</p>
                <p className="text-xs text-neutral-500 mt-1">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Priyanka Desai</p>
                <p className="text-sm">Can you share more details about the solar panel installation costs?</p>
                <p className="text-xs text-neutral-500 mt-1">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Rajesh Kumar</p>
                <p className="text-sm">I implemented this in my business and saved ₹5000 in the first month!</p>
                <p className="text-xs text-neutral-500 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="input-field"
            />
            <button className="ml-2 btn btn-primary">Post</button>
          </div>
        </motion.div>
      )}
      
      {/* Overlay when comments are open */}
      {showComments && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setShowComments(false)}
        />
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default ReelsPage;