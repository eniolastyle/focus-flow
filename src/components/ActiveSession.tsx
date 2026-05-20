import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, Quote as QuoteIcon } from 'lucide-react';
import { MINDFUL_QUOTES, Quote } from '../types';
import { soundscapeEngine } from '../lib/audio';

interface ActiveSessionProps {
  duration: number; // in minutes
  onEndEarly: () => void;
  onComplete: () => void;
  soundscape: 'rain' | 'birds' | 'silence' | 'library';
}

export default function ActiveSession({
  duration,
  onEndEarly,
  onComplete,
  soundscape,
}: ActiveSessionProps) {
  const totalSeconds = duration * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [currentQuote, setCurrentQuote] = useState<Quote>(MINDFUL_QUOTES[0]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  
  // Track mouse coordinates for the premium glass depth floating shadow
  const [shadowStyle, setShadowStyle] = useState({ x: 0, y: 0 });
  
  const timerRef = useRef<number | null>(null);

  // Focus Countdown logic
  useEffect(() => {
    // Fire up active soundscape
    if (soundscape !== 'silence' && !isAudioMuted) {
      soundscapeEngine.setSoundscape(soundscape);
    }

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      soundscapeEngine.stop();
    };
  }, [duration, onComplete, soundscape, isAudioMuted]);

  // Quote rotation logic (every 20 seconds for organic pacing)
  useEffect(() => {
    let quoteIndex = 0;
    const interval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % MINDFUL_QUOTES.length;
      setCurrentQuote(MINDFUL_QUOTES[quoteIndex]);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Premium mouse shadow coordinate tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setShadowStyle({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEndSession = () => {
    if (confirm("End your focus session early?")) {
      soundscapeEngine.stop();
      onEndEarly();
    }
  };

  const toggleMute = () => {
    if (isAudioMuted) {
      setIsAudioMuted(false);
      soundscapeEngine.setSoundscape(soundscape);
    } else {
      setIsAudioMuted(true);
      soundscapeEngine.stop();
    }
  };

  // Plant calculations
  const progress = 1 - secondsLeft / totalSeconds;
  // Grow seedling from scale 0.75 to 1.25 over full focus duration
  const currentScale = 0.75 + progress * 0.5;

  // Formatting helpers
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sessionLabel = 
    duration <= 5 ? 'Micro-Focus Session' :
    duration <= 10 ? 'Standard Session' : 'Deep Work Session';

  return (
    <div className="breathing-bg min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 relative w-full transition-all duration-1000 select-none">
      
      {/* Soundscape Overlay Indicator Badge */}
      {soundscape !== 'silence' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-surface-container-low/65 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/10 flex items-center gap-2 shadow-sm text-xs font-medium text-primary">
          <span className="relative flex h-2 w-2">
            <span className="ping-subtle absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Soundscape active: <span className="font-bold capitalize">{soundscape}</span>
          <button 
            onClick={toggleMute}
            className="ml-2 hover:text-primary transition-colors focus:outline-none"
            aria-label={isAudioMuted ? "Unmute audio" : "Mute audio"}
          >
            {isAudioMuted ? <VolumeX className="h-4.5 w-4.5 text-secondary" /> : <Volume2 className="h-4.5 w-4.5 text-primary" />}
          </button>
        </div>
      )}

      {/* Main plant growing box */}
      <div className="flex flex-col items-center text-center space-y-12 max-w-[1140px] w-full mt-4">
        
        {/* Plant Growth Area */}
        <div className="relative w-64 h-64 flex items-end justify-center">
          {/* Pot illustration */}
          <div className="absolute bottom-0 w-32 h-20 bg-surface-container-high rounded-b-2xl rounded-t-sm border-b-4 border-secondary/20 flex items-center justify-center overflow-hidden shadow-sm z-20">
            {/* Earth dot grid pattern inside cup */}
            <div 
              className="w-full h-full opacity-10" 
              style={{
                backgroundImage: 'radial-gradient(#4a654f 1.5px, transparent 0)',
                backgroundSize: '12px 12px'
              }}
            ></div>
          </div>

          {/* Seedling container (Scales over time) */}
          <motion.div
            style={{
              transform: `scale(${currentScale})`,
              filter: `drop-shadow(${shadowStyle.x}px ${shadowStyle.y}px 16px rgba(74,101,79,0.15))`,
            }}
            className="relative z-10 mb-16 transform origin-bottom transition-all duration-1000"
          >
            {/* Stem structure */}
            <div className="w-2.5 h-24 bg-primary-container rounded-full mx-auto relative shadow-inner">
              
              {/* Leaf 1 (appears always) */}
              <div className="absolute -left-6 top-8 w-8 h-4 bg-primary rounded-full rotate-[-30deg] origin-right shadow-sm"></div>
              
              {/* Leaf 2 (grows in after 25% progress) */}
              {progress >= 0.25 && (
                <motion.div 
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 30 }}
                  className="absolute -right-6 top-4 w-8 h-4 bg-primary-container rounded-full origin-left shadow-sm"
                ></motion.div>
              )}
              
              {/* Leaf 3 (grows in after 50% progress) */}
              {progress >= 0.50 && (
                <motion.div 
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 0.9, rotate: -45 }}
                  className="absolute -left-5 top-14 w-7 h-3.5 bg-primary/90 rounded-full origin-right shadow-sm"
                ></motion.div>
              )}

              {/* Top Bud blooms into full pink flower once 85% is exceeded! */}
              {progress >= 0.85 ? (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.15 }}
                  className="absolute -top-4 -left-2 w-6 h-6 bg-rose-450 rounded-full shadow-md flex items-center justify-center"
                >
                  <div className="w-2.5 h-2.5 bg-amber-300 rounded-full"></div>
                </motion.div>
              ) : (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-6 bg-primary rounded-full shadow-sm"></div>
              )}
            </div>
          </motion.div>

          {/* Pulsing Light Glow behind planter */}
          <div className="absolute inset-0 bg-primary-container/10 rounded-full blur-[64px] -z-10 animate-pulse-aura"></div>
        </div>

        {/* Focus Timer Display */}
        <div className="space-y-2">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-secondary uppercase">
            {sessionLabel}
          </p>
          <div className="font-sans text-[76px] md:text-[110px] text-on-surface font-extralight tracking-tighter leading-none tabular-nums select-none">
            {formatTime(secondsLeft)}
          </div>
        </div>

        {/* Serene Quotes Carousel with smooth fade animations */}
        <div className="h-16 flex items-center justify-center max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-1.5"
            >
              <QuoteIcon className="h-4 w-4 text-primary opacity-40" />
              <p className="font-sans text-base md:text-lg text-secondary italic px-4 text-center leading-relaxed">
                "{currentQuote.text}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Floating Action footer spacing */}
      <div className="fixed bottom-32 md:bottom-24 left-0 w-full flex justify-center px-margin-mobile z-20">
        <button
          onClick={handleEndSession}
          className="group flex items-center gap-2.5 px-10 py-3.5 bg-surface-container-lowest/40 border border-outline-variant/60 hover:bg-surface-container/40 text-secondary font-sans text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm hover:shadow active:scale-95 cursor-pointer backdrop-blur-sm transition-all"
        >
          <X className="h-4 w-4 text-secondary/70" />
          End Flow
        </button>
      </div>

    </div>
  );
}
