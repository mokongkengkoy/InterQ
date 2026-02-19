import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Summary from './pages/Summary';
import Tips from './pages/Tips';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Footer from './components/common/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview/:roleId" element={<Interview />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        {/* Footer is only hidden during the actual Interview session for focus */}
        <FooterWrapper />
      </div>
    </Router>
  );
}

// Separate component to handle conditional footer visibility
const FooterWrapper = () => {
  const isInterview = window.location.hash.includes('/interview/');
  if (isInterview) return null;
  return <Footer />;
};

export default App;