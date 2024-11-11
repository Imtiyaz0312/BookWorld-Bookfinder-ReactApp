import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import BookList from './BookList';

// InitialBookLists component fetches and displays lists of popular, recent, and classic books
const InitialBookLists = ({ setSelectedBook }) => {
  // State variables to store book data for each category
  const [popularBooks, setPopularBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [classicBooks, setClassicBooks] = useState([]);
  // Loading state to indicate data fetch status
  const [loading, setLoading] = useState(true);

  // Fetch initial book data on component mount
  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        // Fetch books from the Open Library API for each category
        const [popular, recent, classics] = await Promise.all([
          axios.get('https://openlibrary.org/search.json?q=popular&limit=8&sort=rating'), // Popular books
          axios.get('https://openlibrary.org/search.json?q=new releases&limit=8&sort=new'), // New releases
          axios.get('https://openlibrary.org/search.json?q=classics&limit=8&sort=rating')   // Classics
        ]);

        // Update state with fetched data for each book category
        setPopularBooks(popular.data.docs);
        setRecentBooks(recent.data.docs);
        setClassicBooks(classics.data.docs);
      } catch (error) {
        console.error('Error fetching initial books:', error); // Log any errors during data fetching
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchInitialBooks();
  }, []);

  // If data is still loading, return null to avoid rendering
  if (loading) return null;

  return (
    // Render book lists for each category with spacing and padding
    <div className="space-y-12 py-8">
      {/* Display Popular Books list */}
      <BookList 
        title="Popular Books"
        books={popularBooks}
        setSelectedBook={setSelectedBook}
      />
      {/* Display Recent Releases list */}
      <BookList 
        title="Recent Releases"
        books={recentBooks}
        setSelectedBook={setSelectedBook}
      />
      {/* Display Classic Literature list */}
      <BookList 
        title="Classic Literature"
        books={classicBooks}
        setSelectedBook={setSelectedBook}
      />
    </div>
  );
};

export default InitialBookLists;
