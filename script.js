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
    log("componentName", componentName);

    const directoryName = `${process.cwd()}/${componentName}`;
    fs.mkdirSync(directoryName);
    log(`✅ created ${componentName} directory`);

    fs.writeFileSync(
      `${directoryName}/index.js`,
      `import ${componentName} from './${componentName}'\n\nexport default ${componentName}`
    );
    log(
      `✅ created ${path.relative(
        process.cwd(),
        `${directoryName}/index.js`
      )} file`
    );

    fs.writeFileSync(
      `${directoryName}/${componentName}.jsx`,
      `const ${componentName} = () => {\n\treturn <div />\n}`
    );
    log(
      `✅ created ${path.relative(
        process.cwd(),
        `${directoryName}/${componentName}.jsx`
      )} file`
    );

    fs.writeFileSync(
      `${directoryName}/styles.js`,
      `import styled from 'styled-components'`
    );
    log(
      `✅ created ${path.relative(
        process.cwd(),
        `${directoryName}/styles.js`
      )} file`
    );

    fs.writeFileSync(
      `${directoryName}/${componentName}.test.jsx`,
      `import React from 'react'\nimport ${componentName} from './${componentName}'\n\nit('should render <${componentName} />', () => {\n\n})`
    );
    log(
      `✅ created ${path.relative(
        process.cwd(),
        `${directoryName}/${componentName}.test.jsx`
      )} file`
    );
  } catch (err) {
    console.log("Error occured while running scaf script:", err);
  }
} else {
  console.log("Please provide component name");
}
