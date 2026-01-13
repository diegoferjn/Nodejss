import { readFile } from "node:fs/promises";
import path from "node:path";

const NEWS_PATH = path.join(process.cwd(), "data", "news.json");

export async function loadNews() {
  const raw = await readFile(NEWS_PATH, "utf-8");
  const parsed = JSON.parse(raw);

  // Aceptamos array directo o { news: [] }
  const news = Array.isArray(parsed) ? parsed : parsed.news;

  if (!Array.isArray(news)) {
    throw new Error("Formato inválido en data/news.json (se esperaba array o { news: [] }).");
  }

  return news;
}

export async function listNews() {
  return await loadNews();
}

export async function filterNewsByCategory(category) {
  const news = await loadNews();
  const target = (category ?? "").trim().toLowerCase();
  return news.filter(n => (n.category ?? "").toLowerCase() === target);
}

export async function searchNewsByText(query) {
  const news = await loadNews();
  const q = (query ?? "").trim().toLowerCase();

  return news.filter(n => {
    const title = (n.title ?? "").toLowerCase();
    const content = (n.content ?? "").toLowerCase();
    return title.includes(q) || content.includes(q);
  });
}

export async function getCategories() {
  const news = await loadNews();
  const set = new Set(news.map(n => n.category).filter(Boolean));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
}
