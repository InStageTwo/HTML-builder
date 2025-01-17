const fs = require('fs');
const path = require('path');

const initialFolder = path.join(__dirname, 'files');
const folderToCopy = path.join(__dirname, 'files-copy');

(function copyFolder() {
  fs.rm(folderToCopy, { recursive: true, force: true }, (err) => {
    if (err) console.log(err);

    fs.mkdir(folderToCopy, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Directory created successfully!');
    });

    fs.readdir(initialFolder, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);

      for (const file of files) {
        const fileDirectory = path.join(initialFolder, file.name);
        const fileToCopy = path.join(folderToCopy, file.name);

        fs.copyFile(fileDirectory, fileToCopy, (err) => err);
      }
    });
  });
})();
