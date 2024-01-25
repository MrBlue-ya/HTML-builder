const fs = require('node:fs');
const path = require('node:path');

// check if dir have folder 'project-dist'
// if empty - create folder
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  if (files.includes('project-dist')) {
    compileHtml();
    compileCss();
    compileAssets();
  } else {
    fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      compileHtml();
      compileCss();
      compileAssets();
    });
  }
});

// Copy html files from folder components to project-dist
function compileHtml() {
  const pathIndexHtml = path.join(__dirname, 'project-dist', 'index.html');
  const componentsHtml = path.join(__dirname, 'components');

  fs.copyFile(path.join(__dirname, 'template.html'), pathIndexHtml, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.readFile(pathIndexHtml, 'utf8', (err, indexData) => {
      if (err) {
        console.log(err);
        return;
      }

      fs.readdir(componentsHtml, 'utf8', (err, files) => {
        if (err) {
          console.log(err);
          return;
        }

        for (let file of files) {
          let fileName = file.split('.').slice(0, 1).join('');

          fs.readFile(path.join(componentsHtml, file), 'utf8', (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            indexData = indexData.replace(`{{${fileName}}}`, data);

            // Запись обновленного содержимого обратно в файл
            fs.writeFile(pathIndexHtml, indexData, 'utf8', (err) => {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      });
    });
  });
}

// Copy CSS files from styles folder
function compileCss() {
  const pathStyleCss = path.join(__dirname, 'project-dist', 'style.css');

  fs.truncate(pathStyleCss, (err) => {
    if (err) {
      console.log('');
    }
  });

  fs.writeFile(pathStyleCss, '', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      for (let file of files) {
        fs.readFile(
          path.join(__dirname, 'styles', file),
          'utf-8',
          (err, data) => {
            if (err) {
              console.log(err);
            }
            fs.writeFile(pathStyleCss, data, { flag: 'a' }, (err) => {
              if (err) {
                console.log(err);
              }
            });
          },
        );
      }
    });
  });
}

function compileAssets() {
  fs.cp(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
}
