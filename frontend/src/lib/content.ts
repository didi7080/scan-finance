import { Module, Chapter, QuizQuestion } from "./types";
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "public", "content");

export function getAllModuleSlugs(): string[] {
  try {
    return fs
      .readdirSync(CONTENT_DIR)
      .filter((d) =>
        fs.existsSync(path.join(CONTENT_DIR, d, "module.json"))
      );
  } catch {
    return [];
  }
}

export function loadModule(slug: string): Module | null {
  try {
    const filePath = path.join(CONTENT_DIR, slug, "module.json");
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const chapters: Chapter[] =
      raw.ebook?.chapters || raw.chapters || [];
    const quiz: QuizQuestion[] = raw.quiz || [];

    return {
      module_id: raw.module_id,
      title: raw.title,
      slug,
      chapters,
      quiz,
      marketing: raw.marketing,
    };
  } catch {
    return null;
  }
}

export function loadAllModules(): Module[] {
  return getAllModuleSlugs()
    .map(loadModule)
    .filter((m): m is Module => m !== null);
}
