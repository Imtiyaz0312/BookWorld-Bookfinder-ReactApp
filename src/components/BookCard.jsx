import { motion } from 'framer-motion';

const BookCard = ({ book, setSelectedBook }) => {
  // Set cover image URL, fallback to a placeholder if no cover is found
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/400x600?text=No+Cover';

  return (

    //Adding spring animation to the card
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5, 
        z: 50 
      }}
      transition={{
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onClick={() => setSelectedBook(book)} 
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform-gpu"
      style={{ perspective: "1000px" }} 
    >
      {/* Book cover image */}
      <div className="aspect-[2/3] relative">
        <img 
          src={coverUrl} 
          alt={book.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay with opacity change on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>
      
      {/* Book details */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ delay: 0.2 }} 
        className="p-4 bg-white border-t border-accent/20"
      >
        {/* Book title */}
        <h3 className="text-lg font-semibold text-primary truncate">
          {book.title}
        </h3>
        {/* Author's name */}
        <p className="text-secondary text-sm">
          {book.author_name ? book.author_name[0] : 'Unknown Author'}
        </p>
        {/* First published year */}
        <p className="text-accent text-sm">
          {book.first_publish_year || 'Year unknown'}
        </p>
      </motion.div>

      {/* "View Details" button on hover */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} 
        whileHover={{ scale: 1, opacity: 1 }}
        className="absolute top-2 right-2 bg-primary text-light px-2 py-1 rounded text-xs"
      >
        View Details
      </motion.div>
    </motion.div>
  );
};

export default BookCard;
