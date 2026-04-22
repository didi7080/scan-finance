"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadManifest } from "@/lib/content";
import { Level, UserProgress } from "@/lib/types";
import { loadProgress } from "@/lib/progress";
import LevelCard from "./LevelCard";
import HealthScore from "./HealthScore";
import ExpertChat from "./chat/ExpertChat";

export default function DashboardClient() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const manifest = await loadManifest();
        setLevels(manifest.levels);
        setProgress(loadProgress());
      } catch (e) {
        console.error("Failed to load manifest", e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]">Chargement...</div>;

  const totalModules = levels.reduce((acc, l) => acc + l.modules.length, 0);
  const completedCount = progress?.completedModules.length || 0;
  const score = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <div className="py-8 space-y-12">
      <header className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Votre parcours vers la <span className="text-gold-500">liberté financière</span>
        </motion.h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Apprenez, investissez et optimisez votre patrimoine avec Scan Finance Master.
        </p>
      </header>

      <HealthScore score={score} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, idx) => (
          <LevelCard 
            key={level.id} 
            level={level} 
            index={idx}
            progress={progress}
          />
        ))}
      </div>

      <ExpertChat />
    </div>
  );
}
