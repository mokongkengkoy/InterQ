import React from 'react';
import Header from '../components/common/Header';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl">
                <SafeIcon icon={FiIcons.FiShield} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>

            <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Privacy-First Architecture</h2>
                <p>
                  InterQ is designed with a "Local-First" philosophy. Unlike traditional platforms, we do not 
                  transmit your voice recordings or interview data to any external servers. Everything stays 
                  on your device.
                </p>
              </section>

              <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h2 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <SafeIcon icon={FiIcons.FiLock} /> How Your Data is Secured
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-indigo-800 text-sm">
                  <li><strong>Local Storage:</strong> Your audio recordings are stored in your browser's IndexedDB.</li>
                  <li><strong>No Cloud Uploads:</strong> We do not have a backend database for your recordings.</li>
                  <li><strong>No Tracking:</strong> We do not use third-party tracking pixels or invasive analytics.</li>
                  <li><strong>Zero Access:</strong> Since data is local, InterQ developers cannot access your sessions.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Microphone Usage</h2>
                <p>
                  InterQ requires microphone access solely for the purpose of the interview simulation. 
                  The audio stream is captured locally and saved as a blob in your browser's private storage 
                  for your personal review.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Retention</h2>
                <p>
                  Your data persists as long as you keep your browser data. You can permanently delete all 
                  recordings at any time by clearing your browser cache or using the "Clear All" function 
                  within the application settings (where applicable).
                </p>
              </section>

              <div className="pt-8 border-t border-gray-100 text-sm italic">
                Last Updated: October 2024
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;