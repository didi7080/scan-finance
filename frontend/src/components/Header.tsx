"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Target, Flame, Trophy, Menu } from "lucide-react";
import { loadProgress } from "@/lib/progress";
import { UserProgress, getRank } from "@/lib/types";

export default function Header() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const rank = progress ? getRank(progress.xp) : null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-navy-950/80 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center group-hover:shadow-gold-glow transition-shadow">
            <span className="font-bold text-navy-950">S</span>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Scan <span className="text-gold-500">Finance</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {progress && (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm font-medium">{progress.streak} j</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Trophy className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium">{progress.xp} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 rounded-full border border-gold-500/20">
                <span className="text-xs text-gold-500 font-bold uppercase tracking-wider">
                  {rank?.name}
                </span>
              </div>
            </div>
          )}
          <button className="p-2 text-white/60 hover:text-white md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
