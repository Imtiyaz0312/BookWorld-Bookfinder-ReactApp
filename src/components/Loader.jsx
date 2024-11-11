import { motion } from 'framer-motion';

// Loader component displays a rotating and scaling animation to indicate loading
const Loader = () => {
  return (
    // Center the loader horizontally and vertically within a 64px height container
    <div className="flex justify-center items-center h-64">
      {/* Animated circle that rotates 360 degrees and scales up and down */}
      <motion.div
        animate={{
          rotate: 360, 
          scale: [1, 1.2, 1], 
        }}
        transition={{
          duration: 1, 
          repeat: Infinity, // Repeat animation infinitely
          ease: "linear" 
        }}
        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loader;
