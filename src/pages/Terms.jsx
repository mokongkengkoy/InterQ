import React from 'react';
import Header from '../components/common/Header';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const Terms = () => {
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
                <SafeIcon icon={FiIcons.FiFileText} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
            </div>

            <div className="prose prose-indigo max-w-none text-gray-600 space-y-6 text-sm md:text-base">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By using InterQ, you agree to these terms. InterQ is a free tool provided to help individuals 
                  practice for job interviews.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use License</h2>
                <p>
                  InterQ is provided "as is" for personal, non-commercial use. You may use the simulation 
                  engine and review your recordings for educational purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Disclaimer</h2>
                <p>
                  The interview questions provided are for practice purposes and do not guarantee 
                  actual interview questions or employment outcomes. We provide no warranty regarding 
                  the accuracy of the simulations or the persistence of browser-based storage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
                <p>
                  In no event shall InterQ or its contributors be liable for any damages (including, 
                  without limitation, damages for loss of data) arising out of the use or inability 
                  to use the materials on InterQ.
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

export default Terms;