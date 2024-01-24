const fs = require('node:fs');
const path = require('node:path');

const readFile = path.join(__dirname, './text.txt');

const reader = fs.createReadStream(readFile, { encoding: 'utf-8' });
reader.on('data', (chunk) => {
  console.log(chunk);
});
