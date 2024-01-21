const fs = require('node:fs');
const path = require('node:path');

const newFolder = path.join(__dirname, 'files-copy');

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  if (files.includes('files-copy')) {
    console.log('Folder "files-copy" has already been created!');
    copyDir();
  } else {
    fs.mkdir(newFolder, (err) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log('folder was successfully create');
      }
    });
    copyDir();
  }
});

function copyDir() {
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
}
