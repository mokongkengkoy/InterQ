import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { jobRoles, getQuestions } from '../data/questions';
import { saveRecording } from '../utils/audioDb';
import Header from '../components/common/Header';
import Timer from '../components/interview/Timer';
import QuestionDisplay from '../components/interview/QuestionDisplay';
import RecordingIndicator from '../components/interview/RecordingIndicator';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_TIME = 120;
const DEFAULT_COUNT = 5;

const Interview = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Session details
  const sessionDuration = location.state?.customDuration || DEFAULT_TIME;
  const roundType = location.state?.roundType || 'balanced';
  const questionCount = location.state?.questionCount || DEFAULT_COUNT;
  const sessionTimestamp = useRef(Date.now()).current;

  // State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(sessionDuration);
  const [isPaused, setIsPaused] = useState(false);
  const [role, setRole] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);

  // Audio Refs
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    const selectedRole = jobRoles.find(r => r.id === roleId);
    if (!selectedRole) {
      navigate('/');
      return;
    }
    setRole(selectedRole);
    setQuestions(getQuestions(roleId, questionCount, roundType));
  }, [roleId, navigate, roundType, questionCount]);

  // Recording Logic
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setCurrentAudioUrl(url);
        
        await saveRecording(
          audioBlob, 
          questions[currentIndex], 
          role.title, 
          sessionTimestamp
        );
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setIsAnswered(false);
      setCurrentAudioUrl(null);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsAnswered(true);
    }
  };

  // Start recording when question changes (if not in playback mode)
  useEffect(() => {
    if (questions.length > 0 && !isPaused && !isAnswered) {
      startRecording();
    }
    return () => {
      if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        stopRecording();
      }
    };
  }, [currentIndex, questions.length, isPaused, isAnswered]);

  const finishInterview = useCallback(() => {
    navigate('/summary', { 
      state: { 
        total: questions.length, 
        role: role, 
        durationPerQuestion: sessionDuration,
        roundType: roundType,
        sessionTimestamp: sessionTimestamp
      } 
    });
  }, [navigate, questions.length, role, sessionDuration, roundType, sessionTimestamp]);

  const handleStopAndReview = () => {
    stopRecording();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeRemaining(sessionDuration);
      setIsAnswered(false);
      setIsPaused(false);
      setCurrentAudioUrl(null);
    } else {
      finishInterview();
    }
  };

  if (!role || questions.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-gray-500 font-medium">Preparing your session...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${role.color} bg-opacity-10`}>
                <SafeIcon name={role.icon.replace('Fi','')} className={`text-xl text-${role.color.replace('bg-','')}`} style={{ color: 'inherit' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{role.title}</h3>
                <p className="text-xs text-indigo-600 uppercase tracking-widest font-black">
                   {roundType} • Q{currentIndex + 1}/{questions.length}
                </p>
              </div>
            </div>
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium flex items-center gap-1">
              <SafeIcon icon={FiIcons.FiX} /> Exit
            </button>
          </div>

          <div className="flex flex-col items-center">
            <RecordingIndicator isRecording={isRecording} />
            
            {!isAnswered && (
              <Timer 
                duration={sessionDuration} 
                timeRemaining={timeRemaining} 
                setTimeRemaining={setTimeRemaining} 
                onTimeUp={handleStopAndReview} 
                isActive={!isPaused && !isAnswered} 
              />
            )}

            <div className="w-full relative">
              <QuestionDisplay 
                question={questions[currentIndex]} 
                index={currentIndex} 
                total={questions.length} 
              />
              
              <AnimatePresence>
                {isAnswered && currentAudioUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="absolute inset-0 z-10 bg-white/98 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-8 border-2 border-indigo-100 shadow-2xl overflow-y-auto"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                      <SafeIcon icon={FiIcons.FiPlayCircle} className="text-2xl text-indigo-600" />
                    </div>
                    
                    <div className="text-center max-w-2xl mb-8">
                      <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-2 block">Reviewing Answer for:</span>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        "{questions[currentIndex]}"
                      </h3>
                    </div>
                    
                    <div className="w-full max-w-md bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-10 shadow-inner">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Playback Recording</p>
                      <audio src={currentAudioUrl} controls className="w-full h-10" />
                    </div>

                    <div className="flex gap-4">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="px-12 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3"
                      >
                        {currentIndex === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
                        <SafeIcon icon={FiIcons.FiArrowRight} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {!isAnswered && (
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="w-full md:w-auto px-8 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                <SafeIcon icon={isPaused ? FiIcons.FiPlay : FiIcons.FiPause} />
                {isPaused ? "Resume" : "Pause"}
              </button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStopAndReview}
                className="w-full md:w-auto px-12 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
              >
                Stop & Review Response
                <SafeIcon icon={FiIcons.FiSquare} />
              </motion.button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Interview;