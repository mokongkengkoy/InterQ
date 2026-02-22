import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const Footer = () => {
  const { FiMessageSquare, FiShield, FiHeart } = FiIcons;

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <SafeIcon icon={FiMessageSquare} className="text-xl" />
              </div>
              <span className="text-xl font-bold text-gray-800 tracking-tight">
                Inter<span className="text-indigo-600">Q</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              InterQ is an immersive interview mastery ecosystem engineered to bridge the gap between theoretical knowledge and vocal performance. We empower professionals across technical, clinical, and business sectors to refine their delivery through high-pressure simulations and expert-curated question banks. Built on a local-first philosophy, InterQ guarantees that your recorded responses and performance data never transit the cloud, providing a completely private, high-fidelity environment to dismantle interview anxiety and perfect your professional story.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  state={{ scrollTo: 'practice-roles' }} 
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Practice Roles
                </Link>
              </li>
              <li>
                <Link 
                  to="/tips" 
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Interview Tips
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  About InterQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md w-fit">
                  <SafeIcon icon={FiShield} /> Secure Local Storage
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © 2024 InterQ Project. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="text-red-400" />
            <span>for job seekers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
