"use client";

import { UserProgress, UserProfile } from "./types";

const STORAGE_KEY = "scan-finance-progress";
const PROFILE_KEY = "scan-finance-profile";
const SUB_KEY = "scan-finance-subscription";

function getDefaultProgress(): UserProgress {
  return {
    completedModules: [],
    completedQuizzes: [],
    xp: 0,
    streak: 0,
    lastActivity: "",
  };
}

function getDefaultProfile(): UserProfile {
  return {
    income: 0,
    expenses: 0,
    assets: 0,
    country: "fr",
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const data = JSON.parse(raw) as UserProgress;
    
    const today = new Date().toISOString().split("T")[0];
    const lastDate = data.lastActivity;
    if (lastDate) {
      const diff = Math.floor((new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 1) data.streak = 0;
    }
    return data;
  } catch { return getDefaultProgress(); }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function completeModule(slug: string): UserProgress {
  const progress = loadProgress();
  if (!progress.completedModules.includes(slug)) progress.completedModules.push(slug);
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActivity !== today) progress.streak += 1;
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
  if (progress.lastActivity !== today) progress.streak += 1;
  progress.lastActivity = today;
  saveProgress(progress);
  return progress;
}

export function calculateFinancialHealthScore(profile: UserProfile): number {
  if (profile.income === 0) return 0;
  const savingsRate = ((profile.income - profile.expenses) / profile.income) * 100;
  const savingsScore = Math.min(25, Math.round((savingsRate / 30) * 25));
  const monthlyExpenses = profile.expenses || 1;
  const emergencyMonths = profile.emergencyMonths ?? (profile.assets / monthlyExpenses);
  const emergencyScore = Math.min(25, Math.round((emergencyMonths / 6) * 25));
  const dti = profile.debtToIncome ?? 0;
  const dtiScore = dti === 0 ? 25 : Math.max(0, Math.round(25 - (dti / 40) * 25));
  const diversification = profile.investmentDiversification ?? 0;
  const divScore = Math.min(25, Math.round((diversification / 100) * 25));
  return savingsScore + emergencyScore + dtiScore + divScore;
}

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(SUB_KEY);
    if (!raw) return false;
    return JSON.parse(raw).isPremium === true;
  } catch { return false; }
}
