const fs = require('fs').promises;
const path = require('path');

async function createProjectDist() {
  const outputDir = path.join(__dirname, 'project-dist');
  await fs.mkdir(outputDir, { recursive: true });

  const templateFilePath = path.join(__dirname, 'template.html');
  let templateContent = await fs.readFile(templateFilePath, 'utf-8');

  const componentsDirectory = path.join(__dirname, 'components');
  const componentFilesList = await fs.readdir(componentsDirectory);

  for (const componentFile of componentFilesList) {
    const componentName = path.parse(componentFile).name;
    const componentFilePath = path.join(componentsDirectory, componentFile);
    const componentContent = await fs.readFile(componentFilePath, 'utf-8');
    const placeholder = `{{${componentName}}}`;
    templateContent = templateContent.replace(
      new RegExp(placeholder, 'g'),
      componentContent,
    );
  }

  const outputHtmlPath = path.join(outputDir, 'index.html');
  await fs.writeFile(outputHtmlPath, templateContent);

  const stylesDirectory = path.join(__dirname, 'styles');
  const styleFilesList = await fs.readdir(stylesDirectory);
  const compiledCssContent = [];

  for (const styleFile of styleFilesList) {
    if (path.extname(styleFile) === '.css') {
      const styleFilePath = path.join(stylesDirectory, styleFile);
      const styleContent = await fs.readFile(styleFilePath, 'utf-8');
      compiledCssContent.push(styleContent);
    }
  }

  const outputCssPath = path.join(outputDir, 'style.css');
  await fs.writeFile(outputCssPath, compiledCssContent.join('\n'));

  const sourceAssetsDir = path.join(__dirname, 'assets');
  const destinationAssetsDir = path.join(outputDir, 'assets');
  await copyAssets(sourceAssetsDir, destinationAssetsDir);
}

async function copyAssets(sourceDir, destinationDir) {
  await fs.mkdir(destinationDir, { recursive: true });
  const itemsInSource = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const item of itemsInSource) {
    const sourceItemPath = path.join(sourceDir, item.name);
    const destinationItemPath = path.join(destinationDir, item.name);

    if (item.isDirectory()) {
      await copyAssets(sourceItemPath, destinationItemPath);
    } else {
      await fs.copyFile(sourceItemPath, destinationItemPath);
    }
  }
}

createProjectDist().catch(console.error);
