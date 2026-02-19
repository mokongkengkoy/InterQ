import React from 'react';
import { motion } from 'framer-motion';

const RecordingIndicator = ({ isRecording }) => {
  if (!isRecording) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full border border-red-100 shadow-sm mb-6">
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-2.5 h-2.5 bg-red-600 rounded-full"
      />
      <span className="text-xs font-bold uppercase tracking-widest">Recording Response...</span>
    </div>
  );
};

export default RecordingIndicator;