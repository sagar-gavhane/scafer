#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const log = require("debug")("scaf");
const { pascalCase } = require("pascal-case");

log("argv %o", argv);

if (Array.isArray(argv._) && argv._.length > 0) {
  try {
    const componentName = pascalCase(argv._[0]);
    const directoryName = `${process.cwd()}/${componentName}`;
    const relativeDirectoryPath = path.relative(
      process.cwd(),
      `${directoryName}`
    );

    fs.mkdirSync(directoryName);
    log(`✅ created ${componentName} directory`);

    fs.writeFileSync(
      `${directoryName}/index.js`,
      `import ${componentName} from './${componentName}'\n\nexport default ${componentName}`
    );
    log(`✅ created ${relativeDirectoryPath}/index.js file`);

    fs.writeFileSync(
      `${directoryName}/${componentName}.jsx`,
      `import React from 'react'\n\nconst ${componentName} = () => {\n\treturn <div />\n}\n\nexport default ${componentName}`
    );
    log(`✅ created ${relativeDirectoryPath}/${componentName}.jsx file`);

    fs.writeFileSync(
      `${directoryName}/styles.js`,
      `import styled from 'styled-components'`
    );
    log(`✅ created ${relativeDirectoryPath}/styles.js file`);

    fs.writeFileSync(
      `${directoryName}/${componentName}.test.jsx`,
      `import React from 'react'\nimport ${componentName} from './${componentName}'\n\nit('should render <${componentName} />', () => {\n\n})`
    );
    log(`✅ created ${relativeDirectoryPath}/${componentName}.test.jsx file`);
  } catch (err) {
    console.error("Error occured while running scaf script:", err);
  }
} else {
  console.error("Please provide component name.");
}
