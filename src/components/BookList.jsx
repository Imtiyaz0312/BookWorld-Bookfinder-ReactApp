import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import BookCard from './BookCard';
import { FaSpinner, FaChevronDown } from 'react-icons/fa';

const BookList = ({ books: initialBooks, setSelectedBook, title, fetchMoreBooks }) => {
  const [books, setBooks] = useState(initialBooks); // State to hold the list of books
  const [page, setPage] = useState(1); // State to track pagination
  const [loading, setLoading] = useState(false); // State to show loading spinner
  const [hasMore, setHasMore] = useState(true); // State to track if more books are available to load
  const observerTarget = useRef(null); // Reference to the element for infinite scrolling
  const isSearchResults = title === "Search Results"; // Check if the current view is for search results

  // Update book list whenever initialBooks changes
  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  // Infinite scrolling logic, triggered when user scrolls near the bottom of the page
  useEffect(() => {
    if (!isSearchResults) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        // Check if target element is in view and more books can be loaded
        if (entries[0].isIntersecting && !loading && fetchMoreBooks && hasMore) {
          setLoading(true); // Show loading spinner
          const newBooks = await fetchMoreBooks(page + 1); 
          if (newBooks.length) {
            setBooks(prev => [...prev, ...newBooks]); 
            setPage(prev => prev + 1); 
          } else {
            setHasMore(false); // No more books to load
          }
          setLoading(false);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of target element is visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current); // Observe the target element
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current); 
      }
    };
  }, [page, loading, fetchMoreBooks, hasMore, isSearchResults]);

  // Handle load more button click for non-search result views like home page with 3 recommended book lists
  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newBooks = await fetchMoreBooks(page + 1);
    if (newBooks.length) {
      setBooks(prev => [...prev, ...newBooks]);
      setPage(prev => prev + 1);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {title && (
        // Animate title heading with motion for smooth entry
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 md:mb-12 text-center"
        >
          {title}
        </motion.h2>
      )}
      
      {/* Display grid of book cards */}
      <div className="grid max-sm:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-6 md:gap-8">
        {books.map((book, index) => (
          <BookCard 
            key={book.key + index} 
            book={book} 
            setSelectedBook={setSelectedBook}
          />
        ))}
      </div>

      {/* Load more button or infinite scroll loading indicator */}
      {fetchMoreBooks && hasMore && (
        <div className="mt-12 text-center">
          {isSearchResults ? (
            <div ref={observerTarget} className="h-20 flex items-center justify-center">
              {/* Loading spinner animation for infinite scroll */}
              {loading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner className="w-8 h-8 text-primary" />
                </motion.div>
              )}
            </div>
          ) : (
            // Load more button for manual loading
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={loading}
              className="group bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-all duration-300 flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  Load More
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaChevronDown className="w-4 h-4 group-hover:text-accent transition-colors" />
                  </motion.div>
                </>
              )}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;
