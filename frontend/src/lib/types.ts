export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  is_free: boolean;
  chapters: Chapter[];
  ebook?: {
    chapters: Chapter[];
  };
  slides?: { id: number; text: string }[];
  quiz: QuizQuestion[];
  affiliation?: {
    provider: string;
    text: string;
    link: string;
  };
  marketing?: {
    hook?: string;
    promise?: string;
    transformation?: string;
  };
}

export interface Level {
  id: number;
  title: string;
  modules: { id: number; slug: string; title: string; free: boolean }[];
}

export interface UserProgress {
  completedModules: string[];
  completedQuizzes: string[];
  xp: number;
  streak: number;
  lastActivity: string;
  isPremium?: boolean;
}

export interface UserProfile {
  income: number;
  expenses: number;
  assets: number;
  country: string;
  emergencyMonths?: number;
  debt?: number;
  debtToIncome?: number;
  investmentDiversification?: number;
}

export const LEVELS_CONFIG = [
  { id: 1, title: "Fondations" },
  { id: 2, title: "Investissement" },
  { id: 3, title: "Fiscalité" },
  { id: 4, title: "Immobilier" },
  { id: 5, title: "Avancé" }
];

export const RANKS = [
  { name: "Débutant", minXp: 0, icon: "🌱" },
  { name: "Épargnant", minXp: 200, icon: "💰" },
  { name: "Investisseur", minXp: 500, icon: "📊" },
  { name: "Analyste", minXp: 1000, icon: "🔍" },
  { name: "Stratège", minXp: 2000, icon: "🎯" },
  { name: "Expert", minXp: 3500, icon: "⭐" },
  { name: "Maître", minXp: 5000, icon: "👑" },
];

export function getRank(xp: number) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) rank = r;
  }
  return rank;
}

export function getNextRank(xp: number) {
  for (const r of RANKS) {
    if (xp < r.minXp) return r;
  }
  return null;
}
