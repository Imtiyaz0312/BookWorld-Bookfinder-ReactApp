import { motion } from 'framer-motion'; 
import { FaBook, FaSearch, FaHeart } from 'react-icons/fa';

function AboutPage() {
  // Defining features with title, description, and an icon for each
  const features = [
    {
      icon: <FaBook />,  // Book icon for the "Extensive Library" feature
      title: "Extensive Library",
      description: "Access millions of books from various genres and authors worldwide."
    },
    {
      icon: <FaSearch />, // Search icon for the "Smart Search" feature
      title: "Smart Search",
      description: "Find your next read with our powerful search."
    },
    {
      icon: <FaHeart />,  // Heart icon for the "Personalized Experience" feature
      title: "Personalized Experience",
      description: "Discover books tailored to your interests and reading preferences."
    }
  ];

  return (
    <div className="flex-grow">
      {/* Hero section with background and introductory text */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative bg-hero-pattern bg-cover bg-center h-[30rem] py-44"
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for text visibility */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and description of the platform */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About BookWorld</h1>
            <p className="text-xl text-light max-w-3xl mx-auto">
              Your gateway to endless literary adventures. We're passionate about connecting readers 
              with their next favorite book.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Mission section with description */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} // Initial position and opacity for animation
        animate={{ opacity: 1, y: 0 }} // Final position and opacity
        transition={{ delay: 0.4 }} // Delay for the animation
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission statement header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe that everyone deserves access to the transformative power of books. 
              Our platform is designed to make discovering and exploring books easier than ever.
            </p>
          </div>

          {/* Features section: Three features with icons, titles, and descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }} // Initial opacity and position for animation
                animate={{ opacity: 1, y: 0 }} // Final opacity and position
                transition={{ delay: 0.6 + index * 0.2 }} // Delayed animations for each feature
                className="text-center p-6 rounded-xl bg-light hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl text-accent mb-4 flex justify-center">
                  {feature.icon} {/* Displaying the feature icon */}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {feature.title} {/* Feature title */}
                </h3>
                <p className="text-gray-600">
                  {feature.description} {/* Feature description */}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Our Community section with a call to action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-16 md:py-24 bg-primary text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Join Our Community</h2>
          <p className="text-lg text-light/90 max-w-3xl mx-auto mb-8">
            Be part of a growing community of book lovers. Share your passion for reading 
            and discover new literary horizons together.
          </p>
          {/* Call to action button */}
          <motion.button
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-accent text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutPage;
