const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');

const textFile = path.join(__dirname + '/myFile.txt');
console.log(textFile);
const rl = readline.createInterface(process.stdin, process.stdout);

console.log('Hi there');

rl.setPrompt('What is your name? ');
rl.prompt();

rl.on('line', (age) => {
  if (age.toLowerCase() === 'exit') {
    console.log("It's sad that you're already leaving");
  } else {
    const data = 'Your name is: ' + age;
    console.log(data);

    fs.writeFile(textFile, data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Data was success saved in file');
      }
    });
  }
  rl.close();
});

rl.on('SIGINT', () => {
  console.log("\nIt's sad that you're already leaving");
  rl.close();
});
