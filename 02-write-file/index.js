const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeFromInput = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

rl.write('Do you like Node?\n');

rl.on('line', (text) => {
  if (text.trim().toLowerCase() === 'exit') rl.close();
  else writeFromInput.write(`${text}\n`);
});

rl.on('close', () => {
  console.log('Goodbye');
  process.exit();
});

rl.on('SIGINT', () => {
  console.log('Goodbye');
  process.exit();
});
