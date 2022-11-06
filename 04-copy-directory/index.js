const fs = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;

(async function copyDir() {
  const pathFolder = path.join(__dirname, 'files');
  const pathCopyFolder = path.join(__dirname, 'files-copy');

  try {
    await fs.rm(pathCopyFolder, { recursive: true, force: true })
    await fs.mkdir(pathCopyFolder, { recursive: true })
    const files = await fs.readdir(pathFolder);
    for (const file of files) {
      const originFile = path.join(pathFolder, file)
      const copyFile = path.join(pathCopyFolder, file)
      await fs.copyFile(originFile, copyFile)
    }
    stdout.write('Copy completed!');
  } catch (err) {
    stdout.write(err);
  }
})();
