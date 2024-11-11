import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Custom hook to fetch initial books (popular, recent, classics)
export function useInitialBooks() {
  // State to store initial books categorized as popular, recent, and classics
  const [initialBooks, setInitialBooks] = useState({
    popular: [],
    recent: [],
    classics: []
  });

  // State to track the loading status of the initial book fetch
  const [initialLoading, setInitialLoading] = useState(true);

  // Callback function to fetch books from the Open Library API based on query and page number
  const fetchBooks = useCallback(async (query, page = 1) => {
    try {
      // Make the API call to fetch books based on the provided query and page 
      //Total of 8 books of each category are shown onn the web site 
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=8`
      );
      // Return the list of books found in the response
      return response.data.docs;
    } catch (error) {
      // Handle any errors by logging them and returning an empty array
      console.error('Error fetching books:', error);
      return [];
    }
  }, []); 
  // useEffect to fetch the initial books (popular, recent, classics) when the component mounts
  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        // Fetch books for the different categories simultaneously using Promise.all
        const [popular, recent, classics] = await Promise.all([
          fetchBooks('popular', 1),          // Fetch popular books
          fetchBooks('new releases', 1),     // Fetch recent books
          fetchBooks('classic literature', 1) // Fetch classic literature books
        ]);

        // Update the state with the fetched books
        setInitialBooks({
          popular,
          recent,
          classics
        });
      } catch (error) {
        console.error('Error fetching initial books:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialBooks(); // Call the function to fetch the books
  }, [fetchBooks]); // Dependency on fetchBooks, ensuring it's available when the effect runs

  // Function to fetch more books for a specific category (popular, recent, classics)
  const fetchMoreInitialBooks = useCallback(async (category, page) => {
    // Map categories to queries for the API call
    const queries = {
      popular: 'popular',
      recent: 'new releases',
      classics: 'classic literature'
    };
    // Fetch additional books based on the category and page
    return await fetchBooks(queries[category], page);
  }, [fetchBooks]); // Dependency on fetchBooks to ensure it's available

  // Return the initial books, loading status, and fetch function to fetch more books
  return { initialBooks, initialLoading, fetchMoreInitialBooks };
}
