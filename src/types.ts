export type Tab = 'focus' | 'journey' | 'settings';

export type ScreenState = 'dashboard' | 'active' | 'complete';

export interface Session {
  id: string;
  duration: number; // in minutes
  date: string;     // e.g., "Oct 24" or "May 20"
  plantType: string; // e.g., "Fern", "Bonsai", "Cactus", etc.
  completed: boolean;
  timestamp: number;
}

export interface Preferences {
  soundscape: 'rain' | 'birds' | 'silence' | 'library';
  darkMode: boolean;
  reminders: boolean;
}

export interface PlantConfig {
  name: string;
  category: string;
  style: string; // CSS color styles
  imgUrl?: string; // beautiful pictures
}

export const PLANT_CONFIGS: Record<string, PlantConfig> = {
  Fern: { name: 'Fern', category: 'Lush Green', style: 'bg-emerald-500/20 text-emerald-700' },
  Bonsai: { name: 'Bonsai', category: 'Zen Miniature', style: 'bg-teal-500/20 text-teal-700' },
  Cactus: { name: 'Cactus', category: 'Desert Succulent', style: 'bg-amber-500/20 text-amber-700' },
  Monstera: { name: 'Monstera', category: 'Tropical Giant', style: 'bg-emerald-600/20 text-emerald-800' },
  Palm: { name: 'Palm', category: 'Coastal Breeze', style: 'bg-cyan-500/20 text-cyan-700' },
  Oak: { name: 'Oak', category: 'Ancient Wisdom', style: 'bg-stone-500/20 text-stone-700' },
  Maple: { name: 'Maple', category: 'Autumn Hearth', style: 'bg-rose-500/20 text-rose-700' },
  Willow: { name: 'Willow', category: 'Weeping Canopy', style: 'bg-emerald-400/20 text-emerald-600' },
  Bamboo: { name: 'Bamboo', category: 'Flexible Strength', style: 'bg-green-500/20 text-green-700' },
  Lilly: { name: 'Lilly', category: 'Water Bloom', style: 'bg-blue-400/20 text-blue-600' },
  Ivy: { name: 'Ivy', category: 'Creeping Vines', style: 'bg-emerald-500/10 text-emerald-600' },
  Sprout: { name: 'Sprout', category: 'New Beginnings', style: 'bg-lime-500/25 text-lime-700' },
};

export interface Quote {
  text: string;
  author?: string;
}

export const MINDFUL_QUOTES: Quote[] = [
  { text: "The quiet mind is a powerful mind.", author: "Zen proverb" },
  { text: "Within you, there is a stillness and a sanctuary.", author: "Hermann Hesse" },
  { text: "Flow is being completely involved in an activity for its own sake.", author: "Mihaly Csikszentmihalyi" },
  { text: "Feelings come and go like clouds in a windy sky.", author: "Thich Nhat Hanh" },
  { text: "Focus is a muscle, and you are building it now.", author: "Focus Flow" },
  { text: "One conscious breath in and out is a meditation.", author: "Eckhart Tolle" },
  { text: "The forest breathes, and with it, you grow.", author: "Focus Flow" }
];
