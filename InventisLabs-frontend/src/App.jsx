import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import LegalPolicy from './pages/LegalPolicy';
import Admin from './pages/Admin';
import TermsOfService from './pages/TermsOfService';
import Cookies from './pages/Cookies';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Careers from './pages/Careers';
import PrivacyNotice from './components/PrivacyNotice';
import Teams from './pages/Teams';

// New Pages
import Solutions from './pages/Solutions';
import TechnologyPage from './pages/TechnologyPage';
import AboutPage from './pages/AboutPage';
import MediaResources from './pages/MediaResources';
import ContactPage from './pages/ContactPage';
import CoveragePage from './pages/CoveragePage';

// Service Pages
import EQAlertPage from './pages/EQAlertPage';
import StructuralMonitoringPage from './pages/StructuralMonitoringPage';
import IoTEngineeringPage from './pages/IoTEngineeringPage';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Cursor />
      <PrivacyNotice />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Main Routes */}
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/media" element={<MediaResources />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/coverage" element={<CoveragePage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/teams" element={<Teams />} />

        {/* Service Pages */}
        <Route path="/solutions/eq-alert" element={<EQAlertPage />} />
        <Route path="/solutions/structural-monitoring" element={<StructuralMonitoringPage />} />
        <Route path="/solutions/iot-engineering" element={<IoTEngineeringPage />} />

        {/* Admin & Legal */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacy-policy" element={<LegalPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
