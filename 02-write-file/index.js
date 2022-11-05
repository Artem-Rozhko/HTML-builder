const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const pathFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathFile, 'utf-8');

stdout.write('Hello, enter text!\n');
stdout.write('Write "exit" or press "Ctrl + c" completes the program\n');
stdin.on('data', data => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    process.exit()
  }
  output.write(data)
});
process.on('exit', () => stdout.write('Have a nice day!\n'))
process.on('SIGINT', () => process.exit());
