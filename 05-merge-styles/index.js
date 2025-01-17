const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');

const writeStream = fs.createWriteStream(outputPath, 'utf-8');

function isCss(file) {
  if (file.isFile() && path.extname(file.name) === '.css') {
    return true;
  }
  return false;
}

function copyCss(file) {
  if (isCss(file)) {
    const filePath = path.join(file.path, file.name);
    const readStream = fs.createReadStream(filePath, 'utf-8');
    readStream.on('data', (chunk) => writeStream.write(chunk));
  }
}

function copyCssFiles(err, files) {
  if (err) {
    console.error(err.message);
    throw err;
  }
  files.forEach(copyCss);
}

fs.readdir(stylesDir, { withFileTypes: true }, copyCssFiles);
