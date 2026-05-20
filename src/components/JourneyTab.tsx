import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Leaf, Flame, Sparkles, X, Info, Award } from 'lucide-react';
import { Session, PLANT_CONFIGS, PlantConfig } from '../types';

interface JourneyTabProps {
  sessions: Session[];
  totalStats: {
    focusTimeMinutes: number;
    plantsGrown: number;
    averageSessionMinutes: number;
  };
}

interface ForestPlant {
  name: string;
  date: string;
  style: string;
  category: string;
  id: string;
  info: string;
}

export default function JourneyTab({
  sessions,
  totalStats,
}: JourneyTabProps) {
  const [selectedPlant, setSelectedPlant] = useState<ForestPlant | null>(null);

  // Static historic dataset to match screen mockup EXACTLY
  const historicalForest: ForestPlant[] = [
    { id: '1', name: 'Fern', date: 'Oct 24', style: 'bg-emerald-500/20 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300', category: 'Lush Green', info: 'Ferns thrive in moist, cool shadows. They signify persistence and shelter, absorbing low-light to grow strong.' },
    { id: '2', name: 'Bonsai', date: 'Oct 23', style: 'bg-teal-500/30 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300', category: 'Zen Miniature', info: 'Bonsai is the art of sculpting miniature trees. It teaches patience, representing harmony between human focus and organic flow.' },
    { id: '3', name: 'Cactus', date: 'Oct 22', style: 'bg-amber-500/20 text-yellow-800 dark:bg-amber-950/30 dark:text-amber-300', category: 'Desert Succulent', info: 'Cacti store water to bloom in desolate deserts. They represent self-containment, endurance, and quiet resilience.' },
    { id: '4', name: 'Monstera', date: 'Oct 21', style: 'bg-emerald-600/25 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300', category: 'Tropical Giant', info: 'Monsteras grow magnificent split leaves to catch sunbeams. They encourage expansion, seeking light in the thick jungle.' },
    { id: '5', name: 'Palm', date: 'Oct 20', style: 'bg-cyan-500/20 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300', category: 'Coastal Breeze', info: 'Palms bend with storm winds but rarely break. They symbolize flexibility, peaceful tranquility, and coastal warmth.' },
    { id: '6', name: 'Oak', date: 'Oct 19', style: 'bg-stone-500/20 text-stone-700 dark:bg-stone-900/40 dark:text-stone-300', category: 'Ancient Wisdom', info: 'The venerable Oak houses hundreds of creatures in its deep boughs. It signifies standing firm, deep roots, and solid stature.' },
    { id: '7', name: 'Maple', date: 'Oct 18', style: 'bg-rose-500/20 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300', category: 'Autumn Hearth', info: 'Maple leaves turn brilliant colors as the seasons chill. They represent transformation, beauty in letting go, and warm gather.' },
    { id: '8', name: 'Willow', date: 'Oct 17', style: 'bg-emerald-400/20 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300', category: 'Weeping Canopy', info: 'Weeping willow branches flow elegantly in the wind. They represent introspection, emotional depth, and adaptation.' },
    { id: '9', name: 'Bamboo', date: 'Oct 16', style: 'bg-green-500/20 text-green-700 dark:bg-green-950/40 dark:text-green-300', category: 'Flexible Strength', info: 'Bamboo is hollow yet incredibly strong, rising high into the columns of forest spaces. It teaches hollow zen and extreme speed.' },
    { id: '10', name: 'Lilly', date: 'Oct 15', style: 'bg-blue-400/25 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300', category: 'Water Bloom', info: 'Lillies rise pristine from muddy waters. They represent clean purity, spiritual awakening, and calmness.' },
    { id: '11', name: 'Ivy', date: 'Oct 14', style: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300', category: 'Creeping Vines', info: 'Ivy climbs steep rock bridges slowly but relentlessly. It represents dedication, partnership, and steady growth.' },
    { id: '12', name: 'Sprout', date: 'Oct 13', style: 'bg-lime-500/25 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300', category: 'New Beginnings', info: 'Every mighty ancient woodland began as a single tiny sprout. It represents hope, pure potential, and the starting step.' },
  ];

  // Convert real React completed session trees to ForestPlant formats
  const userForestPlants: ForestPlant[] = sessions
    .filter((s) => s.completed)
    .map((s) => {
      const config = PLANT_CONFIGS[s.plantType] || PLANT_CONFIGS.Fern;
      return {
        id: s.id,
        name: s.plantType,
        date: s.date,
        style: `${config.style} dark:bg-emerald-950/30 dark:text-emerald-400`,
        category: config.category,
        info: `This serene ${s.plantType} was successfully grown by you on ${s.date} during a focused ${s.duration}-minute deep flow session!`,
      };
    });

  // Combine real user plants first, then historical plants
  const fullForest = [...userForestPlants, ...historicalForest];

  // Format total focus duration dynamically (starting with base 42h 15m)
  const currentTotalFocusMinutes = 42 * 60 + 15 + sessions.reduce((sum, s) => s.completed ? sum + s.duration : sum, 0);
  const hours = Math.floor(currentTotalFocusMinutes / 60);
  const mins = currentTotalFocusMinutes % 60;
  
  const formattedHours = `${hours}h ${mins}m`;
  const currentPlantsGrownTotal = 128 + sessions.filter(s => s.completed).length;

  return (
    <div className="animate-in fade-in duration-800">
      
      {/* Hero statistics display panel */}
      <section className="mb-12 text-center select-none">
        <h2 className="font-sans text-3xl md:text-4xl font-semibold text-on-surface dark:text-zinc-100 mb-2">
          Your Journey
        </h2>
        <p className="text-secondary dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
          A visual history of your focus sessions and personal growth. Each plant represents a milestone of deep work.
        </p>
        
        {/* Core stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-5 border border-secondary-fixed dark:border-zinc-800 shadow-sm flex flex-col items-center">
            <Timer className="text-primary dark:text-emerald-400 h-8 w-8 mb-2" />
            <p className="text-[10px] tracking-widest font-bold uppercase text-secondary dark:text-zinc-400">Focus Time</p>
            <p className="font-sans text-2xl font-bold text-on-surface dark:text-zinc-100 mt-0.5">{formattedHours}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-5 border border-secondary-fixed dark:border-zinc-800 shadow-sm flex flex-col items-center">
            <Leaf className="text-primary dark:text-emerald-400 h-8 w-8 mb-2" />
            <p className="text-[10px] tracking-widest font-bold uppercase text-secondary dark:text-zinc-400">Plants Grown</p>
            <p className="font-sans text-2xl font-bold text-on-surface dark:text-zinc-100 mt-0.5">{currentPlantsGrownTotal}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-5 border border-secondary-fixed dark:border-zinc-800 shadow-sm flex flex-col items-center">
            <Flame className="text-primary dark:text-emerald-400 h-8 w-8 mb-2 animate-pulse" />
            <p className="text-[10px] tracking-widest font-bold uppercase text-secondary dark:text-zinc-400">Best Streak</p>
            <p className="font-sans text-2xl font-bold text-on-surface dark:text-zinc-100 mt-0.5">12 Days</p>
          </div>
        </div>
      </section>

      {/* Your Forest Grid */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans text-xl font-semibold text-on-surface dark:text-zinc-100 flex items-center gap-2">
            Your Forest <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </h3>
          <span className="text-secondary dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            Season: Spring
          </span>
        </div>

        {/* Beautiful tiles of plants */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {fullForest.map((plant, index) => (
            <motion.div
              key={plant.id + '-' + index}
              onClick={() => setSelectedPlant(plant)}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative aspect-square bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-secondary-fixed hover:border-primary-fixed-dim dark:border-zinc-800 dark:hover:border-zinc-700 flex flex-col items-center justify-center p-4 transition-all shadow-sm cursor-pointer"
            >
              {/* Plant Icon Wrapper */}
              <div className={`w-12 h-12 ${plant.style} rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-105`}>
                <Leaf className="h-6 w-6" />
              </div>

              {/* Plant info text */}
              <p className="font-sans text-sm font-semibold text-on-surface dark:text-zinc-200">{plant.name}</p>
              <p className="text-[10px] text-secondary dark:text-zinc-400 opacity-70 mt-0.5">{plant.date}</p>
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-primary/5 dark:bg-emerald-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plant Inspection Modal Details */}
      <AnimatePresence>
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-950 max-w-sm w-full rounded-2xl border border-secondary-fixed dark:border-zinc-800 p-6 shadow-xl relative select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Plant icon header */}
              <div className="flex items-center gap-4 mb-4 mt-2">
                <div className={`w-14 h-14 ${selectedPlant.style} rounded-full flex items-center justify-center`}>
                  <Leaf className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                    {selectedPlant.name}
                  </h4>
                  <p className="text-[10px] font-bold text-primary dark:text-emerald-400 uppercase tracking-widest leading-none">
                    {selectedPlant.category}
                  </p>
                </div>
              </div>

              {/* Main text bio description info */}
              <div className="text-sm text-on-surface-variant dark:text-zinc-300 leading-relaxed space-y-3 mb-6">
                <p>{selectedPlant.info}</p>
                <div className="bg-primary-container/10 dark:bg-emerald-900/10 p-3 rounded-xl border border-primary-fixed-dim/20 dark:border-emerald-950/30 flex items-start gap-2.5">
                  <Info className="h-4.5 w-4.5 text-primary dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-secondary dark:text-zinc-400 italic">
                    Focus garden milestones represent your quiet work and concentration stamina. Great achievements always blossom incrementally.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlant(null)}
                className="w-full bg-primary/15 dark:bg-zinc-850 hover:bg-primary/25 text-primary dark:text-emerald-400 font-sans py-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Award className="h-4 w-4" />
                Serenity Acknowledged
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
