#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Para construir rutas absolutas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del JSON
const newsPath = path.join(__dirname, "data", "news.json");

// Leer y parsear el JSON
function loadNews() {
  const raw = fs.readFileSync(newsPath, "utf-8");
  return JSON.parse(raw);
}

// Mostrar ayuda mínima
function showHelp() {
  console.log("Uso:");
  console.log("  node index.js list");
  console.log("  node index.js filter <Categoria>");
  console.log("  node index.js search <Texto>");
}

// Comandos
function listNews(news) {
  news.forEach((item, i) => {
    console.log(`${i + 1}. [${item.category}] ${item.title}`);
  });
}

function filterNews(news, category) {
  const filtered = news.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  if (filtered.length === 0) {
    console.log(`No hay noticias en la categoría: ${category}`);
    return;
  }

  filtered.forEach((item, i) => {
    console.log(`${i + 1}. [${item.category}] ${item.title}`);
  });
}

function searchNews(news, text) {
  const q = text.toLowerCase();
  const results = news.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    console.log(`No se encontraron resultados para: ${text}`);
    return;
  }

  results.forEach((item, i) => {
    console.log(`${i + 1}. [${item.category}] ${item.title}`);
  });
}

// --- Programa principal ---
const [, , command, ...rest] = process.argv;
const news = loadNews();

if (!command) {
  showHelp();
} else if (command === "list") {
  listNews(news);
} else if (command === "filter") {
  const category = rest.join(" ").trim();
  if (!category) showHelp();
  else filterNews(news, category);
} else if (command === "search") {
  const text = rest.join(" ").trim();
  if (!text) showHelp();
  else searchNews(news, text);
} else {
  showHelp();
}
