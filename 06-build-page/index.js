const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;

async function creadStyle() {
  const pathFilesCss = path.join(__dirname, 'styles');
  const pathProject = path.join(__dirname, 'project-dist');
  const pathCommonFile = path.join(__dirname, 'project-dist', 'style.css');
  try {
    await fsProm.mkdir(pathProject, { recursive: true })
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
  } catch (err) {
    stdout.write(err);
  }
};

(async () => {
  try {
    await creadStyle();
  } catch (err) {
    console.log(err);
  }
})();