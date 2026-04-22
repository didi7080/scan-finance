import { Module } from "./types";

export async function loadManifest() {
  const res = await fetch("/manifest.json");
  return res.json();
}

export async function loadModule(levelId: number, slug: string): Promise<Module | null> {
  try {
    const res = await fetch(`/content/level-${levelId}/${slug}/module.json`);
    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.ebook && data.ebook.chapters) {
      data.chapters = data.ebook.chapters;
    }
    
    return data;
  } catch {
    return null;
  }
}

export async function loadAllModules(): Promise<Module[]> {
  return [];
}
