export function parseArgs(argv) {
  // argv = ["node", "index.js", "command", ...args]
  const command = argv[2];
  const args = argv.slice(3);
  return { command, args };
}
