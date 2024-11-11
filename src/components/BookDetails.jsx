import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const BookDetails = ({ book, onClose }) => {
  if (!book) return null; // If no book is selected, do not render anything

  // Set the cover image URL, with a placeholder if no cover is available
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/400x600?text=No+Cover';

  return (
    <AnimatePresence>
      {/* Background overlay for the modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close modal when clicking on overlay (when clicked other than bookdetails panel)
        className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      >
        {/* Modal content container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={e => e.stopPropagation()} // Prevent overlay click from closing modal when clicking inside
          className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <div className="fixed m-4 flex">
            <button
              onClick={onClose} // Close modal on button click
              className="top-3 right-3 text-white hover:text-gray-700 bg-[#739E82] rounded-full p-1 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 min-[450px]:grid-cols-2 gap-8 p-8">
            {/* Book cover image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={coverUrl}
                alt={book.title}
                className="w-full rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            
            {/* Book details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Book title */}
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{book.title}</h2>
              
              {/* Author name */}
              <p className="text-lg text-accent mb-2">
                By {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
              </p>
              
              {/* First publish year */}
              <p className="text-accent mb-6">
                First published: {book.first_publish_year || 'Year unknown'}
              </p>
              
              {/* Subjects related to the book */}
              {book.subject && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 5).map((subject, index) => (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        key={index}
                        className="bg-light text-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        {subject}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Publishers */}
              {book.publisher && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">Publishers</h3>
                  <p className="text-accent">
                    {book.publisher.slice(0, 3).join(', ')}
                  </p>
                </div>
              )}
              
              {/* Link to book's Open Library page */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View on Open Library
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookDetails;
