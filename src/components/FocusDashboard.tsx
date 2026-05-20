import { motion } from 'motion/react';
import { Zap, Timer, Hourglass, BrainCircuit, Sprout, Heart, Flower2, Leaf, CheckCircle2 } from 'lucide-react';
import { MINDFUL_QUOTES } from '../types';

interface FocusDashboardProps {
  onStartSession: (duration: number) => void;
  streak: number;
  completedToday: boolean;
  totalStats: {
    focusTimeMinutes: number;
    plantsGrown: number;
    averageSessionMinutes: number;
  };
}

export default function FocusDashboard({
  onStartSession,
  streak,
  completedToday,
  totalStats,
}: FocusDashboardProps) {
  // Simple ambient scale effect for primary start flow button
  const startBtnAnimate = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Safe percentage calculation for progress circle
  const dailyPercent = completedToday ? 100 : 75;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Header Section */}
      <section className="text-center mb-12 select-none">
        <h1 className="font-sans text-4xl md:text-5xl font-semibold text-on-surface dark:text-zinc-100 mb-4 tracking-tight leading-none">
          Welcome to your sanctuary.
        </h1>
        <p className="text-on-surface-variant dark:text-zinc-400 max-w-xl mx-auto mb-8 text-lg font-normal leading-relaxed">
          Find your rhythm and cultivate deep work through intentional, quiet moments.
        </p>

        {/* Main Breath / Action Trigger */}
        <div className="relative inline-block group pt-2">
          <div className="absolute -inset-1 bg-primary/20 rounded-full blur-xl opacity-45 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
          <motion.button
            onClick={() => onStartSession(10)}
            animate={startBtnAnimate}
            whileTap={{ scale: 0.96 }}
            className="relative bg-primary dark:bg-emerald-800 text-on-primary font-sans text-lg font-medium py-3 px-12 md:px-16 rounded-full shadow-lg hover:shadow-xl active:scale-95 cursor-pointer border border-primary-fixed-dim/20 transition-all"
          >
            Start a 10-minute flow
          </motion.button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Daily Journey Streak Card */}
        <div className="md:col-span-7 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-secondary-fixed dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans text-xl font-semibold text-on-surface dark:text-zinc-150">
                Daily Journey
              </h2>
              <span className="text-[10px] text-primary dark:text-emerald-400 font-bold uppercase tracking-widest bg-primary-container/20 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                {streak} Day Streak
              </span>
            </div>

            {/* Garden of session icons list */}
            <div className="flex flex-wrap items-center justify-around gap-4 py-4 select-none">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 dark:bg-zinc-800/80 flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-primary-container/20 group-hover:scale-105 transition-transform">
                  <BrainCircuit className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-medium text-secondary dark:text-zinc-400">Mon</span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 dark:bg-zinc-800/80 flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-primary-container/20 group-hover:scale-105 transition-transform">
                  <Sprout className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-xs font-medium text-secondary dark:text-zinc-400">Tue</span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 dark:bg-zinc-800/80 flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-primary-container/20 group-hover:scale-105 transition-transform">
                  <Heart className="h-6 w-6 text-rose-500/80 dark:text-rose-400/80" />
                </div>
                <span className="text-xs font-medium text-secondary dark:text-zinc-400">Wed</span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 dark:bg-zinc-800/80 flex items-center justify-center text-primary dark:text-primary-fixed-dim border border-primary-container/20 group-hover:scale-105 transition-transform">
                  <Flower2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-medium text-secondary dark:text-zinc-400">Thu</span>
              </div>

              <div className="flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border group-hover:scale-110 ${
                  completedToday 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-inner' 
                    : 'bg-zinc-100 dark:bg-zinc-800/20 text-zinc-300 dark:text-zinc-600 border-zinc-200 dark:border-zinc-800'
                }`}>
                  <Leaf className={`h-6 w-6 ${completedToday ? 'text-primary animate-pulse' : ''}`} />
                </div>
                <span className="text-xs font-medium text-secondary dark:text-zinc-400">Today</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-secondary dark:text-zinc-400 mt-6 leading-relaxed select-none">
            Your focus garden is thriving. Each icon represents a session completed this week. {completedToday ? "Today's plant has successfully grown!" : "Complete today's stream to unlock your fifth leaf."}
          </p>
        </div>

        {/* Quick Commit Card */}
        <div className="md:col-span-5 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-secondary-fixed dark:border-zinc-800 rounded-2xl p-6 flex flex-col shadow-sm">
          <h2 className="font-sans text-xl font-semibold text-on-surface dark:text-zinc-150 mb-6 text-center">
            Quick Commit
          </h2>
          
          <div className="flex flex-col gap-3 flex-grow justify-center">
            {/* option 1: Micro focus */}
            <button
              onClick={() => onStartSession(5)}
              className="flex items-center justify-between w-full bg-secondary-container/30 dark:bg-zinc-800/30 hover:bg-secondary-container/60 dark:hover:bg-zinc-800/60 p-4 rounded-xl transition-all cursor-pointer group active:scale-[0.98] border border-transparent hover:border-outline-variant/30"
            >
              <span className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-secondary dark:text-zinc-400 group-hover:text-amber-500 transition-colors" />
                <span className="font-semibold text-sm text-on-surface dark:text-zinc-250">Micro-Focus</span>
              </span>
              <span className="text-secondary dark:text-zinc-400 text-sm font-medium">5 mins</span>
            </button>

            {/* option 2: Standard highlight */}
            <button
              onClick={() => onStartSession(10)}
              className="flex items-center justify-between w-full bg-primary-container/10 dark:bg-emerald-900/10 hover:bg-primary-container/20 dark:hover:bg-emerald-900/20 p-4 rounded-xl transition-all cursor-pointer border border-primary/20 dark:border-emerald-700/30 shadow-inner group active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                <Timer className="h-5 w-5 text-primary dark:text-emerald-400 animate-spin-slow" style={{ animationDuration: '6s' }} />
                <span className="font-bold text-sm text-primary dark:text-emerald-400">Standard</span>
              </span>
              <span className="text-primary dark:text-emerald-400 text-sm font-bold">10 mins</span>
            </button>

            {/* option 3: Deep work */}
            <button
              onClick={() => onStartSession(15)}
              className="flex items-center justify-between w-full bg-secondary-container/30 dark:bg-zinc-800/30 hover:bg-secondary-container/60 dark:hover:bg-zinc-800/60 p-4 rounded-xl transition-all cursor-pointer group active:scale-[0.98] border border-transparent hover:border-outline-variant/30"
            >
              <span className="flex items-center gap-3">
                <Hourglass className="h-5 w-5 text-secondary dark:text-zinc-400 group-hover:text-teal-500 transition-colors" />
                <span className="font-semibold text-sm text-on-surface dark:text-zinc-250">Deep Work</span>
              </span>
              <span className="text-secondary dark:text-zinc-400 text-sm font-medium">15 mins</span>
            </button>
          </div>
        </div>

        {/* Stats Growth Indicator (approaching stillness) */}
        <div className="md:col-span-12 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-secondary-fixed dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* SVG circular progress */}
            <div className="relative w-36 h-36 flex items-center justify-center select-none">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-secondary-fixed dark:text-zinc-800"
                  cx="72"
                  cy="72"
                  fill="transparent"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <motion.circle
                  className="text-primary dark:text-emerald-500"
                  cx="72"
                  cy="72"
                  fill="transparent"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="377"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * dailyPercent) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-on-surface dark:text-zinc-100">{dailyPercent}%</span>
                <span className="text-[10px] tracking-wider font-semibold text-secondary dark:text-zinc-400 uppercase">Daily Goal</span>
              </div>
            </div>

            {/* Description and small indicators */}
            <div className="flex-grow text-center md:text-left select-none">
              <h3 className="font-sans text-xl font-semibold text-on-surface dark:text-zinc-150 mb-2">
                Approaching Stillness
              </h3>
              <p className="text-sm text-on-surface-variant dark:text-zinc-400 leading-relaxed mb-4 max-w-2xl">
                You've reached {(totalStats.focusTimeMinutes / 60).toFixed(1)} hours of focus flow total. Your concentration is becoming more effortless and consistent as you build this positive ritual.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-emerald-500/5 dark:bg-emerald-950/10 px-3 py-1.5 rounded-full border border-emerald-500/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Consistency +12%
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/5 dark:bg-emerald-950/10 px-3 py-1.5 rounded-full border border-emerald-500/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Avg Flow: {totalStats.averageSessionMinutes}m
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
