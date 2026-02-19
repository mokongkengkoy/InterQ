import React from 'react';
import Header from '../components/common/Header';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const StepCard = ({ number, title, text }) => (
  <div className="flex gap-6 items-start">
    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg shadow-indigo-200">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Simplified Hero */}
        <section className="bg-white border-b border-gray-100 pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                How <span className="text-indigo-600">InterQ</span> Works.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                A professional-grade simulation environment to help you overcome interview anxiety through repetition and data-driven self-review.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Core Engine Walkthrough */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Simulation Workflow</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <StepCard 
                  number="01" 
                  title="Choose Your Track" 
                  text="Select from Tech, Business, Marketing, or Healthcare. Tech roles (Software, Electrical, Mechanical) unlock specialized technical deep-dives, while others focus on high-stakes behavioral HR mocks."
                />
                <StepCard 
                  number="02" 
                  title="Configure Your Session" 
                  text="Choose between 5 to 20 questions. Set your response timer (1m, 2m, or 5m) to simulate the precise pressure of real-world scenarios. Customization allows for both quick drills and full marathon sessions."
                />
                <StepCard 
                  number="03" 
                  title="Record & Commit" 
                  text="When the question appears, the timer starts and your microphone activates. You must speak your answer out loud. This forces you to move beyond 'mental notes' and into verbal execution."
                />
                <StepCard 
                  number="04" 
                  title="The Auditory Mirror" 
                  text="After each answer, you play back your recording. This is the most critical step. You'll hear your filler words, your pacing, and the clarity of your logic as if you were the interviewer."
                />
              </div>
            </div>

            {/* Feature Table/Grid for Tech vs HR */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    Track A
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Mock Interview</h3>
                  <p className="text-gray-600 text-sm mb-6">Designed for Engineering roles. Focuses on system design, core fundamentals, and problem-solving methodologies.</p>
                  <ul className="space-y-3">
                    {['Circuit Design & Power (Elec)', 'System Architecture (Tech)', 'Thermodynamics (Mech)', 'Big O & Scalability'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <SafeIcon icon={FiIcons.FiCheckCircle} className="text-indigo-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t lg:border-t-0 lg:border-l border-gray-100 pt-12 lg:pt-0 lg:pl-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    Track B
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">HR & Behavioral Mock</h3>
                  <p className="text-gray-600 text-sm mb-6">Standard for all professional roles. Focuses on the STAR method, leadership, conflict resolution, and cultural fit.</p>
                  <ul className="space-y-3">
                    {['Conflict Management', 'Leadership Scenarios', 'STAR Method Structure', 'Adaptability & Growth'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <SafeIcon icon={FiIcons.FiCheckCircle} className="text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Recording Importance */}
            <div className="bg-indigo-900 rounded-[2.5rem] p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                  <SafeIcon icon={FiIcons.FiZap} />
                </div>
                <h2 className="text-3xl font-bold mb-6">Why Recording is Non-Negotiable</h2>
                <p className="text-indigo-100 leading-relaxed mb-8">
                  Most candidates prepare by reading or writing. However, the <strong>vocal delivery</strong> of an answer is 50% of the score. InterQ's recording feature is designed to expose your "verbal tics" and filler words. By listening to yourself, you build a feedback loop that leads to immediate improvement in clarity and confidence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="font-bold text-sm mb-1">Muscle Memory</h4>
                    <p className="text-xs text-indigo-200/70">Build the neural paths for complex explanations.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="font-bold text-sm mb-1">Time Management</h4>
                    <p className="text-xs text-indigo-200/70">Learn to feel a 2-minute window without looking at a clock.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="font-bold text-sm mb-1">Privacy First</h4>
                    <p className="text-xs text-indigo-200/70">Audio stays in your browser. No servers, no eavesdropping.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;