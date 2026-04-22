"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Level, UserProgress } from "@/lib/types";

interface LevelCardProps {
  level: Level;
  index: number;
  progress: UserProgress | null;
}

export default function LevelCard({ level, index, progress }: LevelCardProps) {
  const totalModules = level.modules.length;
  const completedInLevel = level.modules.filter((m) => 
    progress?.completedModules.includes(m.slug)
  ).length;
  const percentage = Math.round((completedInLevel / totalModules) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative group p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold-500/30 transition-all shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
          Niveau {level.id} : {level.title}
        </h2>
        <div className="text-sm font-semibold text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
          {percentage}%
        </div>
      </div>

      <div className="w-full bg-white/5 h-1.5 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
        />
      </div>

      <div className="space-y-3">
        {level.modules.map((mod) => {
          const isCompleted = progress?.completedModules.includes(mod.slug);
          const isLocked = !mod.free && !progress?.isPremium;

          return (
            <div 
              key={mod.slug}
              className="flex items-center justify-between group/item"
            >
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <PlayCircle className="w-5 h-5 text-white/20 group-hover/item:text-gold-500 transition-colors" />
                )}
                <span className={`text-sm ${isCompleted ? 'text-white/80' : 'text-white/60'} group-hover/item:text-white transition-colors`}>
                  {mod.title}
                </span>
              </div>
              
              {isLocked ? (
                <Lock className="w-4 h-4 text-white/20" />
              ) : (
                <Link 
                  href={`/module/${mod.slug}?level=${level.id}`}
                  className="text-xs font-bold text-gold-500 hover:text-gold-400 uppercase tracking-widest"
                >
                  Continuer
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
