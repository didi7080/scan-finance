export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Module {
  module_id: string;
  title: string;
  slug: string;
  chapters: Chapter[];
  quiz: QuizQuestion[];
  marketing?: {
    hook?: string;
    promise?: string;
    transformation?: string;
  };
}

export interface Level {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  modules: string[];
}

export interface UserProgress {
  completedModules: string[];
  completedQuizzes: string[];
  xp: number;
  streak: number;
  lastActivity: string;
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Fondations",
    icon: "🏛️",
    description: "Maîtrisez les bases de la finance personnelle",
    color: "from-emerald-500 to-emerald-700",
    modules: ["impots-ir", "pea-vs-cto", "dca", "premier-ordre"],
  },
  {
    id: 2,
    name: "Investissement",
    icon: "📈",
    description: "Stratégies d'investissement et d'allocation",
    color: "from-blue-500 to-blue-700",
    modules: ["assurance-vie", "or-actifs-refuges", "ir", "per"],
  },
  {
    id: 3,
    name: "Fiscalité",
    icon: "⚖️",
    description: "Optimisation fiscale et arbitrages",
    color: "from-purple-500 to-purple-700",
    modules: ["flat-tax", "niches-fiscales", "donations", "isr"],
  },
  {
    id: 4,
    name: "Immobilier",
    icon: "🏠",
    description: "Stratégies immobilières et crédit",
    color: "from-amber-500 to-amber-700",
    modules: ["residence-principale", "credit-immo", "lmnp-expert", "scpi"],
  },
  {
    id: 5,
    name: "Avancé",
    icon: "🚀",
    description: "Indépendance financière et structures",
    color: "from-rose-500 to-rose-700",
    modules: ["sci", "independance-financiere", "psychologie-argent"],
  },
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
