import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionDisplay = ({ question, index, total }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 min-h-[300px] flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute top-4 right-6 text-sm font-bold text-gray-300">
        Q{index + 1} / {total}
      </div>
      
      <AnimatePresence mode='wait'>
        <motion.div
          key={question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
            {question}
          </h2>
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-8 text-sm text-gray-400">
        Speak your answer clearly. Imagine the interviewer is in front of you.
      </div>
    </div>
  );
};

export default QuestionDisplay;