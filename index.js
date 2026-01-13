import { parseArgs } from "./src/cli.js";
import {
  listNews,
  getCategories,
  filterByCategory,
  searchByText
} from "./src/dataService.js";
import { info, error } from "./src/utils/logger.js";

const { command, args } = parseArgs(process.argv);

async function main() {
  try {
    switch (command) {
      case "list":
        console.table(await listNews());
        break;

      case "categories":
        console.log(await getCategories());
        break;

      case "filter":
        console.table(await filterByCategory(args[0]));
        break;

      case "search":
        console.table(await searchByText(args[0]));
        break;

      case "help":
      default:
        info("Comandos disponibles:");
        info("- list");
        info("- categories");
        info("- filter <categoria>");
        info("- search <texto>");
        break;
    }
  } catch (err) {
    error(err.message);
  }
}

main();
