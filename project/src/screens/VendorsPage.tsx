import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, MapPin, Star, Phone, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BottomNavigation from '../components/navigation/BottomNavigation';
import { type Vendor } from '../context/AppContext';

const VendorsPage: React.FC = () => {
  const { vendors } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter categories
  const filterCategories = ['Plastic Recycling', 'E-Waste', 'Fabric Waste', 'Food Waste', 'Chemical Waste'];
  
  // Filter and sort vendors
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vendor.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = !selectedFilter || vendor.service.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else {
      return b.rating - a.rating;
    }
  });
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const selectFilter = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };
  
  const toggleSort = () => {
    setSortBy(sortBy === 'distance' ? 'rating' : 'distance');
  };
  
  const contactVendor = (vendor: Vendor) => {
    // In a real app, this would trigger a call or message
    alert(`Contacting ${vendor.name} at ${vendor.contact}`);
  };
  
  const schedulePickup = (vendor: Vendor) => {
    // In a real app, this would open a scheduling interface
    alert(`Schedule pickup with ${vendor.name}`);
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
          
          <h1 className="text-xl font-poppins font-bold">Waste Management Vendors</h1>
        </div>
      </motion.header>
      
      {/* Search and Filter Bar */}
      <motion.div
        className="px-4 py-3 bg-white dark:bg-neutral-800 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search vendors or services"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10" 
          />
        </div>
        
        <div className="flex mt-3 justify-between">
          <button 
            className="btn btn-outline py-1 px-3 h-8 text-sm"
            onClick={toggleFilters}
          >
            <Filter size={14} />
            Filter
          </button>
          
          <button 
            className="btn btn-outline py-1 px-3 h-8 text-sm"
            onClick={toggleSort}
          >
            <ArrowUpDown size={14} />
            Sort by: {sortBy === 'distance' ? 'Nearest' : 'Top Rated'}
          </button>
        </div>
        
        {/* Filter options */}
        {showFilters && (
          <motion.div
            className="mt-3 flex flex-wrap gap-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filterCategories.map((category) => (
              <button
                key={category}
                className={`py-1 px-3 rounded-full text-xs font-medium transition-colors ${
                  selectedFilter === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}
                onClick={() => selectFilter(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>
      
      {/* Vendors List */}
      <motion.section
        className="px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {filteredVendors.length > 0 ? (
          <div className="space-y-4">
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img 
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white dark:bg-neutral-900 rounded-lg px-2 py-1 text-xs font-medium shadow">
                      <div className="flex items-center">
                        <Star size={12} className="text-warning-500 fill-warning-500 mr-1" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{vendor.name}</h3>
                        <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{vendor.service}</p>
                      </div>
                      <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <MapPin size={14} className="mr-1 text-error-500" />
                        {vendor.distance}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{vendor.address}</p>
                    
                    <div className="flex items-center mt-2">
                      <Phone size={14} className="text-primary-500 mr-1" />
                      <span className="text-sm">{vendor.contact}</span>
                    </div>
                    
                    <div className="flex mt-4 space-x-3">
                      <button 
                        className="btn btn-primary flex-1 py-2"
                        onClick={() => contactVendor(vendor)}
                      >
                        Contact Now
                      </button>
                      <button 
                        className="btn btn-outline flex-1 py-2"
                        onClick={() => schedulePickup(vendor)}
                      >
                        Schedule Pickup
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mx-auto w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4"
            >
              <Search size={24} className="text-neutral-500" />
            </motion.div>
            <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">No vendors found</h3>
            <p className="text-sm text-neutral-500 mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
      </motion.section>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default VendorsPage;