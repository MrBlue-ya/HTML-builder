const fs = require('node:fs');
const path = require('node:path');

const pathFile = path.join(__dirname + '/secret-folder');

fs.readdir(pathFile, (err, files) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('This folder contain: ');
    console.log(files);
  }
  console.log('\nFiles info:');
  for (let i = 0; i < files.length; i++) {
    fs.stat(`${pathFile}/${files[i]}`, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const extension = path.extname(files[i]).slice(1);
        console.log(`${files[i]} - ${extension} - ${stats.size / 10 ** 3}kb`);
      }
    });
  }
});
