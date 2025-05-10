import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBusinessOwners, mockSectors, mockUser, mockRewards, mockFines, mockVendors, mockReels } from '../data/mockData';

// Define types
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  sector?: string;
  profileImage?: string;
  sustainabilityScore: number;
};

export type Sector = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export type BusinessOwner = {
  id: string;
  name: string;
  business: string;
  sector: string;
  image: string;
  story: string;
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  expiryDate?: string;
};

export type Fine = {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'appealed';
};

export type Vendor = {
  id: string;
  name: string;
  service: string;
  address: string;
  distance: string;
  rating: number;
  contact: string;
  image: string;
};

export type Reel = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  author: string;
  authorImage: string;
};

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  darkMode: boolean;
  sectors: Sector[];
  businessOwners: BusinessOwner[];
  rewards: Reward[];
  fines: Fine[];
  vendors: Vendor[];
  reels: Reel[];
  assistantActive: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleDarkMode: () => void;
  toggleAssistant: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sectors] = useState(mockSectors);
  const [businessOwners] = useState(mockBusinessOwners);
  const [rewards] = useState(mockRewards);
  const [fines] = useState(mockFines);
  const [vendors] = useState(mockVendors);
  const [reels] = useState(mockReels);
  const [assistantActive, setAssistantActive] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication
      if (email && password) {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleAssistant = () => {
    setAssistantActive(prev => !prev);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuth) {
        setUser(mockUser);
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const value: AppContextType = {
    user,
    isAuthenticated,
    isLoading,
    darkMode,
    sectors,
    businessOwners,
    rewards,
    fines,
    vendors,
    reels,
    assistantActive,
    setUser,
    login,
    logout,
    toggleDarkMode,
    toggleAssistant,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};