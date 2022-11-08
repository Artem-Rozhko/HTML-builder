const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;
const pathFolder = path.join(__dirname, 'assets');
const pathCopyFolder = path.join(__dirname, 'project-dist', 'assets');
const pathProjectFolder = path.join(__dirname, 'project-dist');

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
    console.log('Error:', err.message);
  }
};
creatStyle()

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
    console.log('Error:', err.message);
  }
};

copyAssets(pathFolder, pathCopyFolder);

const pathOriginHtml = path.join(__dirname, 'template.html');
const pathCopyHtml = path.join(__dirname, 'project-dist', 'index.html')

async function createHtml() {
  await fsProm.copyFile(pathOriginHtml, pathCopyHtml);
  let contentHtml = await fsProm.readFile(pathCopyHtml, 'utf-8');
  const writeStream = fs.createWriteStream(pathCopyHtml);
  const files = await fsProm.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  for (const file of files) {
    const pathFile = path.join(path.join(__dirname, 'components'), file.name);
    if (file.isFile() && path.extname(pathFile) === '.html') {
      const fileName = path.parse(pathFile).name;
      const contentFileComponent = await fsProm.readFile(pathFile, 'utf-8');
      contentHtml = contentHtml.replace(`{{${fileName}}}`, contentFileComponent);
    }
  }
  writeStream.write(contentHtml);
}
createHtml()
