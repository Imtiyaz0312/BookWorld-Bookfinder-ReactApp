import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import logoImg from '/bookWorld.png';

// Navbar component for page navigation
const Navbar = () => {
  // State to manage mobile menu open/close status
  const [isOpen, setIsOpen] = useState(false);
  
  // Hook to access the current location path
  const location = useLocation();

  // Animation variants for the mobile menu
  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  // Helper function to determine active link based on current path
  const isActive = (path) => location.pathname === path;

  return (
    // Main navigation container with styling and fixed positioning
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Brand Name with fade-in animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            {/* Link to navigate to the home page */}
            <Link to="/" className="text-2xl font-bold text-light hover:text-white transition-colors flex gap-2 items-center">
              <span><img src={logoImg} alt="logo" width={36}/></span>
              BookWorld
            </Link>
          </motion.div>
          
          {/* Desktop menu links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Link to the Home page */}
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${
                  isActive('/') ? 'text-white bg-secondary' : 'text-light hover:text-white'
                }`}
              >
                Home
              </Link>
              {/* Link to the About page */}
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md text-md font-medium transition-colors ${
                  isActive('/about') ? 'text-white bg-secondary' : 'text-light hover:text-white'
                }`}
              >
                About
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light hover:text-white transition-colors"
            >
              {/* Toggle between open and close icons based on menu state */}
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-secondary"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Home link in mobile menu */}
              <Link 
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') ? 'text-white bg-primary' : 'text-light hover:text-white'
                }`}
              >
                Home
              </Link>
              {/* About link in mobile menu */}
              <Link 
                to="/about"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/about') ? 'text-white bg-primary' : 'text-light hover:text-white'
                }`}
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
