const fs = require('fs');
const path = require('path');
const readdir = require('fs/promises');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    for (let file of files) {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileDirectory = path.join(__dirname, 'secret-folder', file.name);
        const fileExtention = path.extname(fileDirectory).slice(1);

        fs.stat(fileDirectory, (err, file) => {
          if (err) return console.error(err);
          const fileSize = file.size / 1024;
          console.log(`${fileName} - ${fileExtention} - ${fileSize}kb`);
        });
      }
    }
  },
);
