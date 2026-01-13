import { parseArgs } from "./src/cli.js";
import {
  listNews,
  filterNewsByCategory,
  searchNewsByText,
  getCategories
} from "./src/dataService.js";
import { showTitle, showSuccess, showError, info } from "./src/utils/logger.js";

async function main() {
  const { command, args } = parseArgs(process.argv);

  try {
    // Contexto (para que "dev-verbose" y "prod" tengan sentido)
    if (process.env.NODE_ENV) {
      info(`NODE_ENV=${process.env.NODE_ENV}`);
    }

    switch (command) {
      case "list": {
        showTitle("Listado de noticias");
        const news = await listNews();
        if (news.length === 0) return info("No hay noticias disponibles.");
        for (const item of news) {
          console.log(`- [${item.category}] ${item.title}`);
        }
        showSuccess(`Mostradas ${news.length} noticias`);
        break;
      }

      case "filter": {
        const category = args.join(" ") || "Ciencia";
        showTitle(`Filtrar por categoría: ${category}`);
        const news = await filterNewsByCategory(category);
        if (news.length === 0) return info("No hay noticias para esa categoría.");
        for (const item of news) {
          console.log(`- ${item.title}`);
        }
        showSuccess(`Encontradas ${news.length} noticias en "${category}"`);
        break;
      }

      case "search": {
        const query = args.join(" ") || "IA";
        showTitle(`Buscar: ${query}`);
        const news = await searchNewsByText(query);
        if (news.length === 0) return info("No hay coincidencias.");
        for (const item of news) {
          console.log(`- [${item.category}] ${item.title}`);
        }
        showSuccess(`Encontradas ${news.length} coincidencias para "${query}"`);
        break;
      }

      case "categories": {
        showTitle("Categorías disponibles");
        const categories = await getCategories();
        for (const c of categories) console.log(`- ${c}`);
        showSuccess(`Total categorías: ${categories.length}`);
        break;
      }

      case "help":
      case undefined:
      case null: {
        showTitle("Ayuda - news-cli");
        console.log("Comandos disponibles:");
        console.log("  list                 -> Lista todas las noticias");
        console.log("  filter <Categoría>    -> Filtra por categoría (ej: Ciencia)");
        console.log("  search <Texto>        -> Busca por texto (ej: IA)");
        console.log("  categories            -> Muestra categorías");
        console.log("");
        console.log("Ejemplos:");
        console.log("  node index.js list");
        console.log("  node index.js filter Ciencia");
        console.log("  node index.js search IA");
        console.log("");
        console.log("Scripts npm:");
        console.log("  npm run dev | help | categories | demo | all");
        break;
      }

      default: {
        showError(`Comando no reconocido: "${command}"`);
        console.log('Usa: "node index.js help" para ver comandos.');
      }
    }
  } catch (err) {
    showError(err?.message ?? String(err));
    process.exitCode = 1;
  }
}

main();
