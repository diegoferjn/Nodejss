// index.js

const args = process.argv.slice(2);

if (args.length > 0) {
  console.log(`Hola ${args[0]}`);
} else {
  console.log("Hola mundo");
}
