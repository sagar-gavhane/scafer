#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const isValid = require("is-valid-path");
const { pascalCase } = require("pascal-case");

if (Array.isArray(argv._) && argv._.length > 0) {
  try {
    const componentName = pascalCase(argv._[0]);
    const directoryName = argv.dir
      ? `${argv.dir}/${componentName}`
      : `${process.cwd()}/${componentName}`;
    const relativeDirectoryPath = path.relative(
      process.cwd(),
      `${directoryName}`
    );
    const tsEnabled = argv.typescript || false;
    const ext = {
      vanilla: tsEnabled ? "ts" : "js",
      jsx: tsEnabled ? "tsx" : "jsx",
    };

    if (!isValid(directoryName)) {
      throw new Error("Please provide valid directory name");
    }

    fs.mkdirSync(directoryName, { recursive: true });
    console.log(`✅ created ${componentName} directory`);

    fs.writeFileSync(
      `${directoryName}/index.${ext.vanilla}`,
      `import ${componentName} from './${componentName}'\n\nexport default ${componentName}`
    );
    console.log(
      `✅ created ${relativeDirectoryPath}/index.${ext.vanilla} file`
    );

    fs.writeFileSync(
      `${directoryName}/${componentName}.${ext.jsx}`,
      `import React from 'react'\n\nconst ${componentName} = () => {\n\treturn <div />\n}\n\nexport default ${componentName}`
    );
    console.log(
      `✅ created ${relativeDirectoryPath}/${componentName}.${ext.jsx} file`
    );

    fs.writeFileSync(
      `${directoryName}/styles.${ext.vanilla}`,
      `import styled from 'styled-components'`
    );
    console.log(
      `✅ created ${relativeDirectoryPath}/styles.${ext.vanilla} file`
    );

    fs.writeFileSync(
      `${directoryName}/${componentName}.test.${ext.jsx}`,
      `import React from 'react'\nimport ${componentName} from './${componentName}'\n\nit('should render <${componentName} />', () => {\n\n})`
    );
    console.log(
      `✅ created ${relativeDirectoryPath}/${componentName}.test.${ext.jsx} file`
    );
  } catch (err) {
    throw new Error(
      `Error occured while running scafer script: ${err.message}`
    );
  }
} else {
  throw new Error(`Please provide component name.`);
}
