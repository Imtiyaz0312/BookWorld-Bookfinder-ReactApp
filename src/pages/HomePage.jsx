import { useState, useCallback } from 'react';
import axios from 'axios'; 
import Header from '../components/Header';
import Loader from '../components/Loader'; 
import BookList from '../components/BookList';
import BookDetails from '../components/BookDetails'; 
import { useInitialBooks } from '../hooks/useInitialBooks';

function HomePage() {
  // State management for search query, books, loading state, selected book, and search results visibility
  const [searchQuery, setSearchQuery] = useState(''); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [selectedBook, setSelectedBook] = useState(null); 
  const [showSearchResults, setShowSearchResults] = useState(false); 
  
  // Using the custom hook to get initial book categories
  const { initialBooks, initialLoading, fetchMoreInitialBooks } = useInitialBooks();

  // Function to fetch books from the Open Library API based on a search query
  const fetchBooks = useCallback(async (query, page = 1) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=12`
      );
      return response.data.docs; 
    } catch (error) {
      console.error('Error fetching books:', error); // Logs any error
      return [];
    }
  }, []); // useCallback is used to memoize this function so it doesn't get recreated on every render

  // Handles search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // If the search query is empty, do nothing

    setLoading(true);
    setShowSearchResults(true); 
    const newBooks = await fetchBooks(searchQuery); // Fetches books based on the search query
    setBooks(newBooks); // Updates the books state with fetched data
    setLoading(false); // Sets loading state to false
  };

  // Fetches more books for search results when the user scrolls or requests more
  const fetchMoreSearchResults = useCallback(async (page) => {
    if (!searchQuery.trim()) return []; // If search query is empty, return an empty array
    return await fetchBooks(searchQuery, page); // Fetches more books based on the search query and page
  }, [searchQuery, fetchBooks]); // Depends on searchQuery and fetchBooks function

  return (
    <>
      {/* Header with search functionality */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      <main className="relative z-10 flex-grow">
        {/* Conditional rendering based on loading state and search results */}
        {loading ? (
          <Loader /> // Shows loader while fetching data
        ) : showSearchResults ? (
          <BookList 
            books={books}
            setSelectedBook={setSelectedBook}
            title="Search Results"
            fetchMoreBooks={fetchMoreSearchResults} // Fetch more search results
          />
        ) : initialLoading ? (
          // If initial books are still loading
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : (
          // If data is loaded, display book lists
          <div className="space-y-16 py-8">
            <BookList 
              title="Popular Books"
              books={initialBooks.popular}
              setSelectedBook={setSelectedBook}
              fetchMoreBooks={(page) => fetchMoreInitialBooks('popular', page)} // Fetch more popular books
            />
            <BookList 
              title="Recent Releases"
              books={initialBooks.recent}
              setSelectedBook={setSelectedBook}
              fetchMoreBooks={(page) => fetchMoreInitialBooks('recent', page)} // Fetch more recent releases
            />
            <BookList 
              title="Classic Literature"
              books={initialBooks.classics}
              setSelectedBook={setSelectedBook}
              fetchMoreBooks={(page) => fetchMoreInitialBooks('classics', page)} // Fetch more classic literature
            />
          </div>
        )}
      </main>

      {/* Book details modal, appears when a book is selected */}
      <BookDetails 
        book={selectedBook} // Passes selected book to BookDetails
        onClose={() => setSelectedBook(null)} // Closes the modal when triggered
      />
    </>
  );
}

export default HomePage;
