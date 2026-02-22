import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { getSessionRecordings } from '../utils/audioDb';
import confetti from 'canvas-confetti';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { motion } from 'framer-motion';

const Summary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [recordings, setRecordings] = useState([]);
  const [loadingAudio, setLoadingAudio] = useState(true);

  useEffect(() => {
    if (state) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe']
      });

      // Fetch recordings for this session
      const fetchAudio = async () => {
        try {
          const data = await getSessionRecordings(state.sessionTimestamp);
          setRecordings(data);
        } catch (err) {
          console.error("Error fetching audio", err);
        } finally {
          setLoadingAudio(false);
        }
      };
      fetchAudio();
    } else {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const totalTimeMinutes = Math.round((state.total * (state.durationPerQuestion || 120)) / 60);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 mb-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiIcons.FiCheck} className="text-4xl text-green-600" />
            </div>
            
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Complete!</h1>
              <p className="text-gray-500">
                Excellent practice for your <strong>{state.role?.title}</strong> interview.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                <div className="text-3xl font-bold text-indigo-600">{state.total}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Questions</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                <div className="text-3xl font-bold text-indigo-600">~{totalTimeMinutes}m</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Total Time</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => navigate('/')} className="flex-1 py-4 rounded-xl bg-gray-900 dark:bg-slate-700 text-white font-bold hover:bg-gray-800 dark:hover:bg-slate-600 transition-all shadow-lg">
                Finish & Exit
              </button>
              <button 
                onClick={() => navigate(`/interview/${state.role.id}`, { 
                  state: { 
                    customDuration: state.durationPerQuestion,
                    roundType: state.roundType,
                    questionCount: state.total
                  } 
                })} 
                className="flex-1 py-4 rounded-xl bg-white text-gray-700 font-bold border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Practice Again
              </button>
            </div>
          </motion.div>

          {/* New Review Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <SafeIcon icon={FiIcons.FiMic} className="text-indigo-600" />
              Your Recorded Responses
            </h2>
            
            {loadingAudio ? (
              <div className="p-12 text-center text-gray-400">Loading recordings...</div>
            ) : recordings.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-dashed border-gray-200 text-gray-400">
                No recordings found for this session.
              </div>
            ) : (
              <div className="grid gap-4">
                {recordings.map((rec, idx) => (
                  <motion.div 
                    key={rec.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <div className="flex-grow">
                      <span className="text-[10px] font-black uppercase text-indigo-500 tracking-tighter">Question {idx + 1}</span>
                      <h4 className="font-bold text-gray-800 leading-tight mt-1">{rec.question}</h4>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto">
                      <audio 
                        controls 
                        src={URL.createObjectURL(rec.blob)} 
                        className="w-full h-10"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summary;
