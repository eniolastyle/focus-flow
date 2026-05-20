import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import FocusDashboard from './components/FocusDashboard';
import ActiveSession from './components/ActiveSession';
import FlowComplete from './components/FlowComplete';
import JourneyTab from './components/JourneyTab';
import SettingsTab from './components/SettingsTab';
import { Tab, ScreenState, Session, PLANT_CONFIGS } from './types';

// Hotlinked avatar urls from mockup images
const AVATAR_POOL = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCHsCXVCCfxKTYccM9KAlpuaTYylOXeVft9lXoAaZoqy6kobG6_uqb49JTtwMOa4HOGqOKCnGh--9IslirjrvmNkTIx74STqcgXBWvIXBLnURPIZlrG3j4tQkEhDHXVHv13NWjawRoAsD3g1DuUZyApi5zLy1QMgoPABA8aKL_GQlVGEc0TJ-eySmO3rP3-CaVs3EPl2JHVSEuMB91ZiHLyeBFPjJheP_-BLrlg1PgKaWLlSJUHQgntldCEdFeqdWLGdps0Zru8Clk1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAcVQFbutYScxNeHiIT2aXUw8r8A5co0Kdyu0oNFW8Cidbbv0ejbNcl-5lxBMD6ZGkAEB0yGU2Hwum1XGgdcevjT_ttuzGiNB-D5hcZBK2V8bcsWKrBmAlNgYtr-taaenBkJ0zpJGUG-XWq64Fp8IOz6plPn_ptO1UlFhz5XH7R0-wIypevB8xkO__3rFahAYdALWKNs72aK9A_ePIXJTfTuDcpD0Qov5oOZ77_2m61W_oVPGMD2j-B4Xd9EFX-kkrKZ4PQbqa1SNzN',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBA13yBfEnstblh6YfQWQd-qwZLpdPGsqM7-8Jz2EK7aBMqeTopVIcI6nEbb5sdVEGR8tNSjBFDVv9aqeoznZ5Itvo_FqTj3Sj0O9VFlm6UscJgS3vxiqYA3c9LRu89jJjTCMNXUgCmdFCTuMQX2X_75tnUSXL-jgfa7M-NfQrfaqQYIvMdG8a3FVzhDJq-MOKOk8d3D440jtZZfKtDHNekxE4eckqozqhJwQceVfKeXHb9_sWP_pAmdmhR1YHUavAI6mB7SS_Duhyw'
];

export default function App() {
  // Navigation Tabs & Subscreen States
  const [currentTab, setCurrentTab] = useState<Tab>('focus');
  const [screenState, setScreenState] = useState<ScreenState>('dashboard');
  
  // Active Timer setup
  const [activeDuration, setActiveDuration] = useState<number>(10);
  const [lastGrownPlant, setLastGrownPlant] = useState<string>('Fern');

  // Persistence States
  const [sessions, setSessions] = useState<Session[]>([]);
  const [streak, setStreak] = useState<number>(7);
  const [completedToday, setCompletedToday] = useState<boolean>(false);

  // Preference details
  const [soundscape, setSoundscape] = useState<'rain' | 'birds' | 'silence' | 'library'>('silence');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [reminders, setReminders] = useState<boolean>(true);

  // Profile avatar cycler index indicator
  const [avatarIndex, setAvatarIndex] = useState<number>(0);

  // Load state from local storage on startup
  useEffect(() => {
    try {
      const persistedSessions = localStorage.getItem('focus_flow_sessions');
      if (persistedSessions) {
        const parsed = JSON.parse(persistedSessions) as Session[];
        setSessions(parsed);

        // Check if today has a completed session
        const todayStr = getFormattedDate(new Date());
        const hasCompletedToday = parsed.some(s => s.completed && s.date === todayStr);
        setCompletedToday(hasCompletedToday);
      }

      const persistedDarkMode = localStorage.getItem('focus_flow_dark_mode');
      if (persistedDarkMode === 'true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }

      const persistedStreak = localStorage.getItem('focus_flow_streak');
      if (persistedStreak) {
        setStreak(parseInt(persistedStreak, 10));
      }

      const persistedSound = localStorage.getItem('focus_flow_soundscape');
      if (persistedSound) {
        setSoundscape(persistedSound as any);
      }
    } catch (e) {
      console.error("Local storage restoration failed:", e);
    }
  }, []);

  // Helper date formatter: e.g. "Oct 24" or "May 20"
  const getFormattedDate = (d: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };

  // Dark light stylesheet synchronizer
  const handleToggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('focus_flow_dark_mode', String(nextMode));
  };

  // Triggering the Focus active sessions counting
  const startActiveSession = (dur: number) => {
    setActiveDuration(dur);
    setScreenState('active');
  };

  const cancelActiveSession = () => {
    setScreenState('dashboard');
  };

  const completeActiveSession = () => {
    // Select a random fresh plant type from configs to award user
    const plantKeys = Object.keys(PLANT_CONFIGS);
    const randomKey = plantKeys[Math.floor(Math.random() * plantKeys.length)];
    setLastGrownPlant(randomKey);

    const todayStr = getFormattedDate(new Date());

    const newSession: Session = {
      id: Math.random().toString(36).substring(2, 9),
      duration: activeDuration,
      date: todayStr,
      plantType: randomKey,
      completed: true,
      timestamp: Date.now()
    };

    const nextSessions = [newSession, ...sessions];
    setSessions(nextSessions);
    localStorage.setItem('focus_flow_sessions', JSON.stringify(nextSessions));

    // Update streak if they haven't completed a session today
    if (!completedToday) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      localStorage.setItem('focus_flow_streak', String(nextStreak));
      setCompletedToday(true);
    }

    setScreenState('complete');
  };

  // Avatar profile image cycler action
  const cycleAvatar = () => {
    setAvatarIndex((prev) => (prev + 1) % AVATAR_POOL.length);
  };

  // Tab Selection router
  const renderTabContent = () => {
    switch (currentTab) {
      case 'focus':
        if (screenState === 'active') {
          return (
            <ActiveSession
              duration={activeDuration}
              onEndEarly={cancelActiveSession}
              onComplete={completeActiveSession}
              soundscape={soundscape}
            />
          );
        }
        if (screenState === 'complete') {
          return (
            <FlowComplete
              duration={activeDuration}
              plantType={lastGrownPlant}
              onStartAnother={() => setScreenState('dashboard')}
              onBackToDashboard={() => setScreenState('dashboard')}
            />
          );
        }
        // default dashboard welcome landing
        return (
          <FocusDashboard
            onStartSession={startActiveSession}
            streak={streak}
            completedToday={completedToday}
            totalStats={{
              focusTimeMinutes: sessions.reduce((sum, s) => s.completed ? sum + s.duration : sum, 0),
              plantsGrown: sessions.filter(s => s.completed).length,
              averageSessionMinutes: sessions.length > 0 
                ? Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length)
                : 10
            }}
          />
        );

      case 'journey':
        return (
          <JourneyTab
            sessions={sessions}
            totalStats={{
              focusTimeMinutes: sessions.reduce((sum, s) => s.completed ? sum + s.duration : sum, 0),
              plantsGrown: sessions.filter(s => s.completed).length,
              averageSessionMinutes: sessions.length > 0 
                ? Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length)
                : 10
            }}
          />
        );

      case 'settings':
        return (
          <SettingsTab
            soundscape={soundscape}
            setSoundscape={(sound) => {
              setSoundscape(sound);
              localStorage.setItem('focus_flow_soundscape', sound);
            }}
            darkMode={darkMode}
            toggleDarkMode={handleToggleDarkMode}
            reminders={reminders}
            setReminders={setReminders}
          />
        );
    }
  };

  // Render main screen coordinates setup
  return (
    <div className="min-h-screen bg-background dark:bg-zinc-950 text-on-surface dark:text-zinc-100 transition-colors duration-500 pb-20 md:pb-6">
      {/* Top logo header and desktop tab links */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // If a user navigates away from active Focus session screen, safely reset screen state back to dashboard dashboard
          if (tab !== 'focus') {
            setScreenState('dashboard');
          }
        }}
        darkMode={darkMode}
        toggleDarkMode={handleToggleDarkMode}
        avatarUrl={AVATAR_POOL[avatarIndex]}
      />

      {/* Main Sanctuary content area spacing */}
      <main className="pt-24 pb-20 max-w-[1140px] mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {renderTabContent()}
      </main>

      {/* Secret avatar cycler nudge to encourage avatar switching */}
      {currentTab === 'settings' && (
        <div className="text-center mt-6 text-xs text-secondary dark:text-zinc-500">
          <button 
            onClick={cycleAvatar} 
            className="hover:text-primary dark:hover:text-emerald-400 font-medium underline cursor-pointer"
          >
            Cycle your Sanctuary Avatar Profile Card
          </button>
        </div>
      )}
    </div>
  );
}
