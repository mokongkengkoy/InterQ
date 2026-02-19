import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobRoles } from '../data/questions';
import JobCard from '../components/home/JobCard';
import Header from '../components/common/Header';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(jobRoles.map(role => role.category))];

  const filteredRoles = useMemo(() => {
    return jobRoles.filter(role => {
      const matchesSearch = role.title.toLowerCase().includes(search.toLowerCase()) || 
                           role.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || role.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const handleSelectRole = (role, selectedDuration, roundType, qCount) => {
    navigate(`/interview/${role.id}`, { 
      state: { 
        customDuration: selectedDuration, 
        roundType: roundType,
        questionCount: qCount 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Practice Roles & <span className="text-indigo-600">Career Paths.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your specific domain to access curated question banks tailored to industry standards.
            </p>
          </motion.div>

          {/* Quick How-to-Start Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { icon: FiIcons.FiTarget, title: "1. Select Role", text: "Find your specific profession" },
              { icon: FiIcons.FiSliders, title: "2. Customize", text: "Set time & question limits" },
              { icon: FiIcons.FiMic, title: "3. Practice", text: "Record & review your voice" }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <SafeIcon icon={step.icon} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                  <p className="text-xs text-gray-500">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <SafeIcon icon={FiIcons.FiSearch} className="text-gray-400 text-xl" />
              </div>
              <input 
                type="text" 
                placeholder="Search 50+ professions (e.g. Frontend, Nurse, Sales)..." 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-white text-gray-500 border border-gray-100 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredRoles.map((role) => (
                <motion.div
                  key={role.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <JobCard role={role} onSelect={handleSelectRole} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredRoles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <SafeIcon icon={FiIcons.FiSearch} className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No roles found</h3>
              <p className="text-gray-500">Try searching for a different keyword or category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;