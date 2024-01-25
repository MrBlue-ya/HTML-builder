const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');

const textFile = path.join(__dirname + '/myFile.txt');
const rl = readline.createInterface(process.stdin, process.stdout);

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  if (files.includes('myFile.txt')) {
    askName();
  } else {
    fs.writeFile(path.join(__dirname, 'myFile.txt'), '', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    askName();
  }
});

function askName() {
  rl.question('What is your name?', (answer) => {
    if (answer !== 'exit') {
      console.log('hi, ' + answer);
      console.log('Enter another name or type exit');
      askName();

      fs.appendFile(textFile, answer + '\n', (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      rl.close();
    }
  });
}

rl.on('SIGINT', () => {
  console.log("\nIt's sad that you're already leaving");
  rl.close();
});
