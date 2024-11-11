import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    // Main container for the app with minimum screen height and light background
    <div className="min-h-screen bg-light flex flex-col">
      

      <Navbar />
      

      {/* Routes define the main content area where different pages will be rendered */}
      <Routes>

        {/* Route for the home page, mapped to "/" */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the about page, mapped to "/about" */}
        <Route path="/about" element={<AboutPage />} />

      </Routes>
      

      <Footer />
    </div>
  );
}

export default App;
