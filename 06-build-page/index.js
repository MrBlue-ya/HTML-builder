const fs = require('node:fs');
const path = require('node:path');

const testFilesPath = path.join(__dirname, 'test-files');

fs.readFile(
  path.join(__dirname, 'template.html'),
  { encoding: 'utf-8' },
  (err, file) => {
    if (err) {
      console.log(err);
      return;
    }
    if (file.includes('{{about}}')) {
      fs.copyFile(
        path.join(testFilesPath, 'components', 'about.html'),
        path.join(__dirname, 'components', 'about.html'),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        },
      );

      fs.copyFile(
        path.join(testFilesPath, 'styles', '04-about.css'),
        path.join(__dirname, 'styles', '04-about.css'),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        },
      );

      fs.copyFile(
        path.join(testFilesPath, 'images', 'squirrel-2.jpg'),
        path.join(__dirname, 'assets', 'img', 'squirrel-2.jpg'),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        },
      );
    }
  },
);

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

  fs.copyFile(path.join(__dirname, 'template.html'), pathIndexHtml, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    const componentsHtml = path.join(__dirname, 'components');
    fs.readFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      { encoding: 'utf-8' },
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const indexHtml = data;

          fs.readFile(
            path.join(componentsHtml, 'articles.html'),
            { encoding: 'utf-8' },
            (err, articlesHtml) => {
              if (err) {
                console.log(err);
                return;
              }

              fs.readFile(
                path.join(componentsHtml, 'footer.html'),
                { encoding: 'utf-8' },
                (err, footerHtml) => {
                  if (err) {
                    console.log(err);
                    return;
                  }

                  fs.readFile(
                    path.join(componentsHtml, 'about.html'),
                    { encoding: 'utf-8' },
                    (err, aboutHtml) => {
                      if (err) {
                        return;
                      }

                      fs.readFile(
                        path.join(componentsHtml, 'header.html'),
                        { encoding: 'utf-8' },
                        (err, headerHtml) => {
                          if (err) {
                            console.log(err);
                            return;
                          }
                          const updateindexHtml = indexHtml
                            .replace('{{header}}', headerHtml)
                            .replace('{{about}}', aboutHtml)
                            .replace('{{articles}}', articlesHtml)
                            .replace('{{footer}}', footerHtml);

                          fs.writeFile(
                            pathIndexHtml,
                            updateindexHtml,
                            (err) => {
                              if (err) {
                                console.error(err);
                              }
                            },
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        }
      },
    );
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
