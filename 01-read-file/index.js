const fs = require('node:fs');
const path = require('node:path');

const readFile = path.join(__dirname, './text.txt');

fs.readFile(readFile, { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(data);
  }
});
