import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.resolve("data/news.json");

async function readData() {
  const content = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(content);
}

export async function listNews() {
  return readData();
}

export async function getCategories() {
  const news = await readData();
  const categories = news.map(n => n.category);
  return [...new Set(categories)];
}

export async function filterByCategory(category) {
  if (!category) throw new Error("Categoría no indicada");
  const news = await readData();
  return news.filter(n => n.category === category);
}

export async function searchByText(text) {
  if (!text) throw new Error("Texto de búsqueda no indicado");
  const news = await readData();
  return news.filter(n =>
    n.title.toLowerCase().includes(text.toLowerCase())
  );
}
