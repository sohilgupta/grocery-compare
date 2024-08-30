import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PriceComparison from './pages/PriceComparison';
import GroceryList from './pages/GroceryList';
import UserProfile from './pages/UserProfile';
import Community from './pages/Community';

/**
 * Main App component
 * Sets up routing and overall layout of the application
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          {/* Navigation menu */}
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/compare">Compare Prices</Link></li>
            <li><Link to="/list">Grocery List</Link></li>
            <li><Link to="/profile">User Profile</Link></li>
            <li><Link to="/community">Community</Link></li>
          </ul>
        </nav>
        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<PriceComparison />} />
          <Route path="/list" element={<GroceryList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/community" element={<Community />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;