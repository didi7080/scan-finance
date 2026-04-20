"use client";

import { UserProgress } from "./types";

const STORAGE_KEY = "scan-finance-progress";

function getDefaultProgress(): UserProgress {
  return {
    completedModules: [],
    completedQuizzes: [],
    xp: 0,
    streak: 0,
    lastActivity: "",
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const data = JSON.parse(raw) as UserProgress;

    // Update streak
    const today = new Date().toISOString().split("T")[0];
    const lastDate = data.lastActivity;
    if (lastDate) {
      const diff = Math.floor(
        (new Date(today).getTime() - new Date(lastDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (diff > 1) {
        data.streak = 0;
      }
    }
    return data;
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function completeModule(slug: string): UserProgress {
  const progress = loadProgress();
  if (!progress.completedModules.includes(slug)) {
    progress.completedModules.push(slug);
  }
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActivity !== today) {
    progress.streak += 1;
  }
  progress.lastActivity = today;
  saveProgress(progress);
  return progress;
}

export function completeQuiz(slug: string, xpEarned: number): UserProgress {
  const progress = loadProgress();
  if (!progress.completedQuizzes.includes(slug)) {
    progress.completedQuizzes.push(slug);
    progress.xp += xpEarned;
  }
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActivity !== today) {
    progress.streak += 1;
  }
  progress.lastActivity = today;
  saveProgress(progress);
  return progress;
}

export function getHealthScore(
  completedModules: string[],
  totalModules: number
): number {
  if (totalModules === 0) return 0;
  return Math.round((completedModules.length / totalModules) * 100);
}
