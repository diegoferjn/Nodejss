import chalk from "chalk";

export function showTitle(text, color = "cyan") {
  const paint = chalk[color] ?? chalk.cyan;
  console.log(paint.bold(`\n=== ${text} ===`));
}

export function showSuccess(message) {
  console.log(chalk.green(`✔ ${message}`));
}

export function showError(message) {
  console.error(chalk.red(`✖ ${message}`));
}

// Alias simples (útiles para mensajes neutros)
export function info(message) {
  console.log(chalk.gray(message));
}

export function error(message) {
  showError(message);
}
