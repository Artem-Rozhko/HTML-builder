const fs = require('fs/promises');
const path = require('path');
const { stdin, stdout } = process;

(async () => {
  const pathFolder = path.join(__dirname, 'secret-folder');
  try {
    const files = await fs.readdir(pathFolder, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const pathFile = path.join(pathFolder, file.name);
        const fileName = path.parse(pathFile).name;
        const fileExtension = path.extname(pathFile).slice(1);
        const fileSize = (await fs.stat(pathFile)).size;
        stdout.write(`${fileName} - ${fileExtension} - ${fileSize / 1024}kb\n`);
      }
    }
  } catch (err) {
    stdout.write(err);
  }
})();
