import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const TipSection = ({ title, tips, icon, color }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <div className={`w-10 h-10 ${color} bg-opacity-10 rounded-xl flex items-center justify-center text-xl`}>
        <SafeIcon icon={icon} className={`text-${color.replace('bg-','')}`} style={{color: 'inherit'}} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tips.map((tip, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-[10px] flex items-center justify-center text-gray-500">
              {idx + 1}
            </span>
            {tip.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const Tips = () => {
  const navigate = useNavigate();

  const prepTips = [
    { title: "The STAR Method", description: "Format behavioral answers: Situation, Task, Action, and Result. Always spend 60% of your time on the 'Action' part." },
    { title: "Company Deep Dive", description: "Don't just read the 'About Us'. Search for their recent funding, engineering blogs, or CEO interviews on YouTube." },
    { title: "Prep 3 Stories", description: "Have three versatile stories ready that cover conflict resolution, technical failure, and leadership." }
  ];

  const technicalTips = [
    { title: "Think Out Loud", description: "In technical rounds, the process matters more than the answer. Explain your trade-offs as you design the solution." },
    { title: "Clarify Requirements", description: "Never start answering a technical prompt immediately. Ask 2-3 clarifying questions to define the scope." },
    { title: "Complexity Awareness", description: "Always discuss Time and Space complexity (Big O) without being asked. It shows senior-level maturity." }
  ];

  const deliveryTips = [
    { title: "Kill the Fillers", description: "Use the InterQ playback feature to count your 'umms' and 'likes'. Silence is better than a filler word." },
    { title: "Camera Eye Contact", description: "Look at the lens, not the screen. It creates the psychological feeling of eye contact for the interviewer." },
    { title: "The 2-Minute Rule", description: "Keep most answers under 2 minutes. If you go longer, you risk losing the interviewer's attention." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto mt-12 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            >
              Interview <span className="text-indigo-600">Mastery Guide</span>
            </motion.h1>
            <p className="text-lg text-gray-600">
              Strategies designed to help you communicate your value effectively, whether you're coding a system or leading a team.
            </p>
          </div>

          <TipSection title="Preparation Strategy" tips={prepTips} icon={FiIcons.FiBriefcase} color="bg-blue-500" />
          <TipSection title="Technical Excellence" tips={technicalTips} icon={FiIcons.FiCpu} color="bg-indigo-500" />
          <TipSection title="Communication & Delivery" tips={deliveryTips} icon={FiIcons.FiMic} color="bg-orange-500" />

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="mt-16 bg-gray-900 rounded-[2.5rem] p-12 text-white text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Knowledge is power, but practice is impact.</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto italic">
                "The person who practices 10 times will always beat the person who read the theory 100 times."
              </p>
              <button 
                onClick={() => navigate('/')} 
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-xl active:scale-95"
              >
                Start Practice Session
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Tips;