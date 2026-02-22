import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const JobCard = ({ role, onSelect }) => {
  const technicalCategories = ['Tech', 'Electrical', 'Mechanical'];
  const isTechnicalRole = technicalCategories.includes(role.category);
  
  // Logic: Non-technical roles ONLY see HR. Technical roles see all options.
  const availableRounds = isTechnicalRole ? ['balanced', 'technical', 'hr'] : ['hr'];
  
  const [duration, setDuration] = useState(120);
  const [qCount, setQCount] = useState(5);
  const [roundType, setRoundType] = useState(availableRounds[0]);

  const durationOptions = [
    { label: '1m', value: 60 },
    { label: '2m', value: 120 },
    { label: '5m', value: 300 },
  ];

  const countOptions = [5, 10, 15, 20];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md hover:border-indigo-100 transition-all group"
    >
      <div className={`w-12 h-12 ${role.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-opacity-20 transition-all`}>
        <SafeIcon name={role.icon.replace('Fi', '')} className={`text-2xl text-${role.color.replace('bg-', '')}`} style={{ color: 'inherit' }} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{role.title}</h3>
      <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">{role.category} Path</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">{role.description}</p>

      <div className="space-y-4 pt-4 border-t border-gray-50">
        {/* Step 1: Round Type (Conditional based on role) */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-indigo-600">
            Select Interview Focus
          </label>
          <div className="flex bg-indigo-50 p-1 rounded-xl gap-1">
            {availableRounds.map((type) => (
              <button
                key={type}
                onClick={(e) => { e.stopPropagation(); setRoundType(type); }}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${roundType === type ? 'bg-indigo-600 text-white shadow-sm' : 'text-indigo-400 hover:text-indigo-600'}`}
              >
                {type === 'hr' ? 'HR Mock' : type}
              </button>
            ))}
          </div>
          {!isTechnicalRole && (
            <p className="text-[9px] text-gray-400 italic text-center">
              Technical round is unavailable for this career path.
            </p>
          )}
        </div>

        {/* Step 2: Question Count */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Number of Questions
          </label>
          <div className="flex bg-gray-50 p-1 rounded-xl gap-1">
            {countOptions.map((num) => (
              <button
                key={num}
                onClick={(e) => { e.stopPropagation(); setQCount(num); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${qCount === num ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Time Per Question
          </label>
          <div className="flex bg-gray-50 p-1 rounded-xl">
            {durationOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={(e) => { e.stopPropagation(); setDuration(opt.value); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${duration === opt.value ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSelect(role, duration, roundType, qCount)}
          className="w-full py-3 rounded-xl bg-gray-900 dark:bg-slate-700 text-white font-bold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 group/btn"
        >
          {roundType === 'hr' ? 'Start HR Interview' : 'Start Technical Session'}
          <SafeIcon icon={FiIcons.FiArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
