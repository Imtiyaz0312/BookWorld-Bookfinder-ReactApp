import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

// Header component with animated hero section and search bar
const Header = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    // Animated header with background image and full-height styling
    <motion.header 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="relative w-full h-[57rem] flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed"
    >
      {/* Overlay with gradient effect for improved text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      
      {/* Content container with responsive styling */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main content container with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}  
          transition={{ delay: 0.5 }} 
          className="space-y-8"
        >
          {/* Animated heading text */}
          <h2 className="typewriter text-5xl md:text-7xl font-bold text-white mb-4 mx-auto">
            Find Your Dream Books
          </h2>
          
          {/* Animated subtitle text */}
          <motion.p 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}   
            transition={{ delay: 1 }}        
            className="text-xl md:text-2xl text-light mb-8"
          >
            Discover millions of books and unleash your imagination
          </motion.p>
          
          {/* Search bar container */}
          <div className="max-w-xl mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}    
              transition={{ delay: 1.5 }}           
              className="relative group"
            >
              {/* Search input field with placeholder and styling */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter
                placeholder="Search for books..."
                className="w-full px-6 py-4 pl-14 rounded-full bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent text-lg transition-all duration-300 shadow-lg"
              />
              
              {/* Search icon inside the input field */}
              <FaSearch 
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-primary transition-colors duration-300"
                size={20} 
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
