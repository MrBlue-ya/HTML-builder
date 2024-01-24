const fs = require('node:fs');
const path = require('node:path');

const filesP = path.join(__dirname, 'files');
const filesCopyP = path.join(__dirname, 'files-copy');

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  if (files.includes('files-copy')) {
    console.log('Folder "files-copy" has already been created');
    copyDir();
  } else {
    fs.mkdir(filesCopyP, (err) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log('folder was successfully create');
      }
      copyDir();
    });
  }
});

function copyDir() {
  fs.rm(filesCopyP, { recursive: true }, (err) => {
    if (err) {
      console.error('Failed to clear directory:', err);
      return;
    }
    fs.mkdir(filesCopyP, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
        return;
      }
    });
    fs.readdir(filesP, (err, files) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log('folder "files" contain:');
        console.log(files);

        for (let file of files) {
          fs.copyFile(
            path.join(filesP, file),
            path.join(filesCopyP, file),
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            },
          );
        }
        console.log('all files have been copied');
      }
    });
  });
}
