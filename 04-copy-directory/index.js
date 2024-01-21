const fs = require('node:fs');
const path = require('node:path');

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('folder "files" contain:');
    console.log(files);

    for (let file of files) {
      fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        },
      );
    }
    console.log('copied files in "files-copy": ');
    fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log(files);
      }
    });
  }
});
