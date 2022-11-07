const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;

(async () => {
  const pathFilesCss = path.join(__dirname, 'styles');
  const pathCommonFile = path.join(__dirname, 'project-dist', 'bundle.css');
  try {
    const writeFile = fs.createWriteStream(pathCommonFile);
    const files = await fsProm.readdir(pathFilesCss, { withFileTypes: true });
    for (const file of files) {
      const pathFile = path.join(pathFilesCss, file.name)
      if (file.isFile() && path.extname(pathFile) === '.css') {
        const pathFile = path.join(pathFilesCss, file.name)
        const readFile = fs.createReadStream(pathFile, 'utf-8');
        readFile.pipe(writeFile);
      }
    }
    stdout.write('bundle.css created!');
  } catch (err) {
    stdout.write('Error', err.message);
  }
})();