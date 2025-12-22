import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import Admin from './components/Admin';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';

// Wrapper to conditionally render content based on route (e.g., hiding Navbar on Admin)
const Navigation = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Navbar />;
};

function App() {
  return (
    <Router>
      <Cursor />
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
