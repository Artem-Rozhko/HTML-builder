const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;
const pathFolder = path.join(__dirname, 'assets');
const pathCopyFolder = path.join(__dirname, 'project-dist', 'assets');

async function creatStyle() {
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

async function copyAssets(originFolder, copyFolder) {
  try {
    await fsProm.rm(copyFolder, { recursive: true, force: true })
    await fsProm.mkdir(copyFolder, { recursive: true })
    const files = await fsProm.readdir(originFolder, { withFileTypes: true });
    for (const file of files) {
      const origin = path.join(originFolder, file.name);
      const copy = path.join(copyFolder, file.name);
      if (file.isFile()) {
        await fsProm.copyFile(origin, copy);
      } else {
        await copyAssets(origin, copy);
      }
    }
  } catch (err) {
    stdout.write(err);
  }
};


(async () => {
  try {
    await creatStyle();
    await copyAssets(pathFolder, pathCopyFolder);
  } catch (err) {
    console.log(err);
  }
})();