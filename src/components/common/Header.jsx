import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full py-4 px-6 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md group-hover:bg-indigo-700 transition-colors">
              <SafeIcon icon={FiIcons.FiMessageSquare} className="text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              Inter<span className="text-indigo-600">Q</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/tips" 
              className={`font-medium transition-colors ${isActive('/tips') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Tips
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${isActive('/about') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/opensourcekingprojects/InterQ" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all"
          >
            <SafeIcon icon={FiIcons.FiGithub} /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;