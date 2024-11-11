import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Animated footer container with initial fade-in effect
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary text-light mt-auto" 
    >
      {/* Container for footer content with responsive padding and margin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Grid layout for organizing footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First section - site branding and description */}
          <div>
            <h3 className="text-xl font-bold mb-4">BookWorld</h3>
            <p className="text-sm">
              Your gateway to millions of books. Discover, explore, and find your next great read.
            </p>
          </div>
          
          {/* Second section - quick links for navigation */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Third section - social media and connection information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-sm">
              Follow us on social media for updates and book recommendations.
            </p>
          </div>
        </div>
        
        {/* Bottom section with copyright information */}
        <div className="border-t border-accent mt-8 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} BookWorld. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
