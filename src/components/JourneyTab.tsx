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
    { id: '1', name: 'Fern', date: 'Oct 24', style: 'bg-primary-container/20 text-primary', category: 'Lush Green', info: 'Ferns thrive in moist, cool shadows. They signify persistence and shelter, absorbing low-light to grow strong.' },
    { id: '2', name: 'Bonsai', date: 'Oct 23', style: 'bg-primary-container/25 text-primary', category: 'Zen Miniature', info: 'Bonsai is the art of sculpting miniature trees. It teaches patience, representing harmony between human focus and organic flow.' },
    { id: '3', name: 'Cactus', date: 'Oct 22', style: 'bg-primary-container/15 text-primary', category: 'Desert Succulent', info: 'Cacti store water to bloom in desolate deserts. They represent self-containment, endurance, and quiet resilience.' },
    { id: '4', name: 'Monstera', date: 'Oct 21', style: 'bg-primary-container/20 text-primary', category: 'Tropical Giant', info: 'Monsteras grow magnificent split leaves to catch sunbeams. They encourage expansion, seeking light in the thick jungle.' },
    { id: '5', name: 'Palm', date: 'Oct 20', style: 'bg-primary-container/20 text-primary', category: 'Coastal Breeze', info: 'Palms bend with storm winds but rarely break. They symbolize flexibility, peaceful tranquility, and coastal warmth.' },
    { id: '6', name: 'Oak', date: 'Oct 19', style: 'bg-primary-container/15 text-primary', category: 'Ancient Wisdom', info: 'The venerable Oak houses hundreds of creatures in its deep boughs. It signifies standing firm, deep roots, and solid stature.' },
    { id: '7', name: 'Maple', date: 'Oct 18', style: 'bg-primary-container/20 text-primary', category: 'Autumn Hearth', info: 'Maple leaves turn brilliant colors as the seasons chill. They represent transformation, beauty in letting go, and warm gather.' },
    { id: '8', name: 'Willow', date: 'Oct 17', style: 'bg-primary-container/20 text-primary', category: 'Weeping Canopy', info: 'Weeping willow branches flow elegantly in the wind. They represent introspection, emotional depth, and adaptation.' },
    { id: '9', name: 'Bamboo', date: 'Oct 16', style: 'bg-primary-container/15 text-primary', category: 'Flexible Strength', info: 'Bamboo is hollow yet incredibly strong, rising high into the columns of forest spaces. It teaches hollow zen and extreme speed.' },
    { id: '10', name: 'Lilly', date: 'Oct 15', style: 'bg-primary-container/20 text-primary', category: 'Water Bloom', info: 'Lillies rise pristine from muddy waters. They represent clean purity, spiritual awakening, and calmness.' },
    { id: '11', name: 'Ivy', date: 'Oct 14', style: 'bg-primary-container/15 text-primary', category: 'Creeping Vines', info: 'Ivy climbs steep rock bridges slowly but relentlessly. It represents dedication, partnership, and steady growth.' },
    { id: '12', name: 'Sprout', date: 'Oct 13', style: 'bg-primary-container/20 text-primary', category: 'New Beginnings', info: 'Every mighty ancient woodland began as a single tiny sprout. It represents hope, pure potential, and the starting step.' },
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
        style: `bg-primary-container/25 text-primary`,
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
        <h2 className="font-sans text-3xl md:text-4xl font-semibold text-on-surface mb-2">
          Your Journey
        </h2>
        <p className="text-secondary text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
          A visual history of your focus sessions and personal growth. Each plant represents a milestone of deep work.
        </p>
        
        {/* Core stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/20 shadow-sm flex flex-col items-center">
            <Timer className="text-primary h-8 w-8 mb-2" />
            <p className="text-[10px] tracking-widest font-bold uppercase text-secondary">Focus Time</p>
            <p className="font-sans text-2xl font-bold text-on-surface mt-0.5">{formattedHours}</p>
          </div>
          
          <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/20 shadow-sm flex flex-col items-center">
            <Leaf className="text-primary h-8 w-8 mb-2" />
            <p className="text-[10px] tracking-widest font-bold uppercase text-secondary">Plants Grown</p>
            <p className="font-sans text-2xl font-bold text-on-surface mt-0.5">{currentPlantsGrownTotal}</p>
          </div>
          
          <div className="bg-surface-container-lowest/70 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/20 shadow-sm flex flex-col items-center">
            <Flame className="text-primary h-8 w-8 mb-2 animate-pulse" />
            <p className="text-[10px] tracking-widest font-bold uppercase text-secondary">Best Streak</p>
            <p className="font-sans text-2xl font-bold text-on-surface mt-0.5">12 Days</p>
          </div>
        </div>
      </section>

      {/* Your Forest Grid */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans text-xl font-semibold text-on-surface flex items-center gap-2">
            Your Forest <Sparkles className="h-4 w-4 text-primary" />
          </h3>
          <span className="text-secondary text-xs font-semibold uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full border border-outline-variant/10">
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
              className="group relative aspect-square bg-surface-container-lowest/75 backdrop-blur-md rounded-2xl border border-outline-variant/20 hover:border-primary/40 flex flex-col items-center justify-center p-4 transition-all shadow-sm cursor-pointer"
            >
              {/* Plant Icon Wrapper */}
              <div className={`w-12 h-12 ${plant.style} rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-105`}>
                <Leaf className="h-6 w-6" />
              </div>

              {/* Plant info text */}
              <p className="font-sans text-sm font-semibold text-on-surface">{plant.name}</p>
              <p className="text-[10px] text-secondary opacity-70 mt-0.5">{plant.date}</p>
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plant Inspection Modal Details */}
      <AnimatePresence>
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface max-w-sm w-full rounded-2xl border border-outline-variant/30 p-6 shadow-xl relative select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-container transition-colors text-secondary hover:text-on-surface"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Plant icon header */}
              <div className="flex items-center gap-4 mb-4 mt-2">
                <div className={`w-14 h-14 ${selectedPlant.style} rounded-full flex items-center justify-center`}>
                  <Leaf className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-bold text-on-surface flex items-center gap-2">
                    {selectedPlant.name}
                  </h4>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">
                    {selectedPlant.category}
                  </p>
                </div>
              </div>

              {/* Main text bio description info */}
              <div className="text-sm text-on-surface-variant leading-relaxed space-y-3 mb-6">
                <p>{selectedPlant.info}</p>
                <div className="bg-primary-container/10 p-3 rounded-xl border border-primary-container/20 flex items-start gap-2.5">
                  <Info className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-secondary italic">
                    Focus garden milestones represent your quiet work and concentration stamina. Great achievements always blossom incrementally.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlant(null)}
                className="w-full bg-primary/15 hover:bg-primary/25 text-primary font-sans py-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
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
