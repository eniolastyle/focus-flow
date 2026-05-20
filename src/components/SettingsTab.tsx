import { Volume2, Moon, Bell, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { soundscapeEngine } from '../lib/audio';

interface SettingsTabProps {
  soundscape: 'rain' | 'birds' | 'silence' | 'library';
  setSoundscape: (sound: 'rain' | 'birds' | 'silence' | 'library') => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  reminders: boolean;
  setReminders: (reminders: boolean) => void;
}

export default function SettingsTab({
  soundscape,
  setSoundscape,
  darkMode,
  toggleDarkMode,
  reminders,
  setReminders,
}: SettingsTabProps) {

  const handleSoundSelect = (type: 'rain' | 'birds' | 'silence' | 'library') => {
    setSoundscape(type);
    soundscapeEngine.setSoundscape(type);
  };

  const showSecurityAlert = () => {
    alert("Focus Flow Privacy:\n\nAll your focus sessions, statistics, and settings are preserved locally inside your private browser sanctuary. Your data belongs strictly to you.");
  };

  const showRemindersTrigger = () => {
    setReminders(!reminders);
    if (!reminders) {
      alert("Reminders activated.\n\nWe will nudge you gently each day to continue cultivate your forest mind.");
    }
  };

  return (
    <div className="animate-in fade-in duration-800 max-w-2xl mx-auto select-none">
      
      <h3 className="font-sans text-2xl font-semibold mb-6 text-on-surface dark:text-zinc-100">
        Sanctuary Preferences
      </h3>

      <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-secondary-fixed dark:border-zinc-800 overflow-hidden shadow-sm">
        
        {/* Ambient Soundscapes selector */}
        <div className="p-5 border-b border-secondary-fixed/55 dark:border-zinc-800 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Volume2 className="h-6 w-6 text-secondary dark:text-zinc-400" />
            <div>
              <p className="font-sans text-sm font-semibold text-on-surface dark:text-zinc-150">Soundscape</p>
              <p className="text-xs text-secondary dark:text-zinc-405 leading-relaxed">Choose your background focus audio synthesizer</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {(['rain', 'birds', 'silence', 'library'] as const).map((type) => {
              const active = soundscape === type;
              return (
                <button
                  key={type}
                  onClick={() => handleSoundSelect(type)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer border transition-all active:scale-95 flex items-center gap-1 ${
                    active
                      ? 'bg-primary dark:bg-emerald-800 text-on-primary border-primary dark:border-emerald-700 shadow-sm'
                      : 'bg-secondary-container/30 dark:bg-zinc-800/30 hover:bg-secondary-fixed dark:hover:bg-zinc-800 text-on-secondary-fixed-variant dark:text-zinc-300 border-transparent'
                  }`}
                >
                  {type} {active && <Check className="h-3 w-3 inline ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dark Mode Toggle Switch */}
        <div className="p-5 border-b border-secondary-fixed/55 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Moon className="h-6 w-6 text-secondary dark:text-zinc-400" />
            <div>
              <p className="font-sans text-sm font-semibold text-on-surface dark:text-zinc-150">Dark Mode</p>
              <p className="text-xs text-secondary dark:text-zinc-405 leading-relaxed">Easier on the eyes during late night contemplation</p>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${
              darkMode ? 'bg-primary dark:bg-emerald-700' : 'bg-secondary-fixed dark:bg-zinc-800'
            }`}
            aria-label="Toggle dark mode"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Daily Session Reminders switch */}
        <div className="p-5 border-b border-secondary-fixed/55 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-secondary dark:text-zinc-400" />
            <div>
              <p className="font-sans text-sm font-semibold text-on-surface dark:text-zinc-150">Session Reminders</p>
              <p className="text-xs text-secondary dark:text-zinc-405 leading-relaxed">Daily morning nudge to practice focused mind breathing</p>
            </div>
          </div>
          
          <button
            onClick={showRemindersTrigger}
            className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${
              reminders ? 'bg-primary dark:bg-emerald-700' : 'bg-secondary-fixed dark:bg-zinc-800'
            }`}
            aria-label="Toggle reminders"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow ${
                reminders ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Account Security Privacy card */}
        <button
          onClick={showSecurityAlert}
          className="w-full p-5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors border-none text-left cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-6 w-6 text-secondary dark:text-zinc-400" />
            <div>
              <p className="font-sans text-sm font-semibold text-on-surface dark:text-zinc-150">Account Security</p>
              <p className="text-xs text-secondary dark:text-zinc-405 leading-relaxed">Manage your secure local sandbox storage and privacy</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-secondary opacity-60 dark:text-zinc-400" />
        </button>

      </div>
    </div>
  );
}
