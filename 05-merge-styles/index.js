const fs = require('node:fs');
const path = require('node:path');

const pathFile = path.join(__dirname, 'project-dist');

fs.readdir(pathFile, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  if (files.includes('bundle.css')) {
    copyStyle();
  } else {
    fs.writeFile(path.join(pathFile, 'bundle.css'), '', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    copyStyle();
  }
});

function copyStyle() {
  fs.truncate(path.join(pathFile, 'bundle.css'), (err) => {
    if (err) {
      console.error('');
      return;
    }
  });

  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    for (let file of files) {
      if (path.extname(file) === '.css') {
        fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf-8',
          (err, data) => {
            if (err) {
              console.error(err);
              return;
            } else {
              fs.writeFile(
                path.join(pathFile, 'bundle.css'),
                data,
                { flag: 'a' },
                (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                },
              );
            }
          },
        );
      }
    }
  });
}
