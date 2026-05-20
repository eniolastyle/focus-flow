import { Leaf, Timer, History, Settings, Sun, Moon } from 'lucide-react';
import { Tab } from '../types';

interface NavigationProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  avatarUrl: string;
}

export default function Navigation({
  currentTab,
  setCurrentTab,
  darkMode,
  toggleDarkMode,
  avatarUrl,
}: NavigationProps) {
  return (
    <>
      {/* Top AppBar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-secondary-fixed dark:border-zinc-800 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 max-w-[1140px] mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('focus')}>
            <Leaf className="text-primary dark:text-primary-fixed-dim h-6 w-6" />
            <span className="font-sans font-semibold text-xl text-primary dark:text-primary-fixed-dim tracking-tight">
              Focus Flow
            </span>
          </div>

          {/* Desktop Tab Links */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-8 items-center h-16 mr-4">
              <button
                onClick={() => setCurrentTab('focus')}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-primary ${
                  currentTab === 'focus'
                    ? 'text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary py-1'
                    : 'text-secondary dark:text-zinc-400'
                }`}
              >
                Focus
              </button>
              <button
                onClick={() => setCurrentTab('journey')}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-primary ${
                  currentTab === 'journey'
                    ? 'text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary py-1'
                    : 'text-secondary dark:text-zinc-400'
                }`}
              >
                Journey
              </button>
              <button
                onClick={() => setCurrentTab('settings')}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-primary ${
                  currentTab === 'settings'
                    ? 'text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary py-1'
                    : 'text-secondary dark:text-zinc-400'
                }`}
              >
                Settings
              </button>
            </nav>

            {/* Dark Mode and profile */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-container/50 dark:hover:bg-zinc-800/50 transition-colors text-secondary dark:text-zinc-400"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <div className="w-8 h-8 rounded-full bg-primary-container dark:bg-zinc-800 overflow-hidden ring-2 ring-primary-fixed-dim dark:ring-zinc-700">
                <img
                  alt="User profile avatar"
                  className="w-full h-full object-cover"
                  src={avatarUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-surface/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-secondary-fixed dark:border-zinc-800 h-20 px-margin-mobile pb-safe flex justify-around items-center rounded-t-xl shadow-[0_-4px_20px_rgba(74,101,79,0.05)] transition-colors duration-300">
        <button
          onClick={() => setCurrentTab('focus')}
          className={`flex flex-col items-center justify-center gap-1 w-20 py-1 rounded-xl transition-all ${
            currentTab === 'focus'
              ? 'bg-primary-container/20 dark:bg-primary-container/10 text-primary dark:text-primary-fixed-dim scale-105 font-medium'
              : 'text-secondary dark:text-zinc-400 opacity-70'
          }`}
        >
          <Timer className="h-6 w-6" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Focus</span>
        </button>

        <button
          onClick={() => setCurrentTab('journey')}
          className={`flex flex-col items-center justify-center gap-1 w-20 py-1 rounded-xl transition-all ${
            currentTab === 'journey'
              ? 'bg-primary-container/20 dark:bg-primary-container/10 text-primary dark:text-primary-fixed-dim scale-105 font-medium'
              : 'text-secondary dark:text-zinc-400 opacity-70'
          }`}
        >
          <History className="h-6 w-6" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Journey</span>
        </button>

        <button
          onClick={() => setCurrentTab('settings')}
          className={`flex flex-col items-center justify-center gap-1 w-20 py-1 rounded-xl transition-all ${
            currentTab === 'settings'
              ? 'bg-primary-container/20 dark:bg-primary-container/10 text-primary dark:text-primary-fixed-dim scale-105 font-medium'
              : 'text-secondary dark:text-zinc-400 opacity-70'
          }`}
        >
          <Settings className="h-6 w-6" />
          <span className="text-[10px] tracking-wider uppercase font-semibold">Settings</span>
        </button>
      </nav>
    </>
  );
}
