"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loadManifest } from "@/lib/content";
import { Level, UserProgress } from "@/lib/types";
import { loadProgress } from "@/lib/progress";
import LevelCard from "./LevelCard";
import HealthScore from "./HealthScore";
import ExpertChat from "./chat/ExpertChat";
import { Play, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

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

  const allModules = levels.flatMap(l => l.modules.map(m => ({ ...m, levelId: l.id })));
  const nextModule = allModules.find(m => !progress?.completedModules.includes(m.slug));

  return (
    <div className="py-8 space-y-10">
      <header className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Scan <span className="text-gold-500">Finance Master</span>
        </motion.h1>
      </header>

      {nextModule && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gold-500/10 border border-gold-500/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-gold-500 font-bold text-sm uppercase tracking-widest mb-1">Continuer la lecture</h3>
            <p className="text-white text-xl font-bold">{nextModule.title}</p>
          </div>
          <Link 
            href={`/module/${nextModule.slug}?level=${nextModule.levelId}`}
            className="bg-gold-500 text-navy-950 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gold-400 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> Reprendre
          </Link>
        </motion.div>
      )}

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
            <Users className="text-emerald-500 w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Se faire accompagner</h3>
          <p className="text-zinc-400 leading-relaxed">
            Un expert en gestion de patrimoine peut vous faire gagner des années sur votre indépendance. Diagnostic personnalisé, optimisation fiscale complexe et stratégie sur mesure.
          </p>
          <button className="text-emerald-500 font-bold flex items-center gap-2 group">
            Contacter un expert <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <Play className="text-blue-500 w-6 h-6 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-white">Trade Republic</h3>
          <p className="text-zinc-400 leading-relaxed">
            Le courtier n°1 en Europe pour automatiser vos investissements en ETF. Ouvrez un compte et profitez de 4% d'intérêts sur votre cash dormant.
          </p>
          <a href="#" target="_blank" className="text-blue-500 font-bold flex items-center gap-2 group">
            Ouvrir mon compte <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <ExpertChat />
    </div>
  );
}
