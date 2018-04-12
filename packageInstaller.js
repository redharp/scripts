const util = require('util');
const exec = util.promisify(require('child_process').exec);

const devPackages = `--dev webpack webpack-cli html-loader babel-preset-env babel-plugin-transform-class-properties babel-core babel-loader style-loader css-loader html-webpack-plugin babel-preset-react babel-polyfill`;
const reactPackages = 'react react-dom';

async function yarnAdd(packages) {
  const { stdout, stderr } = await exec(`yarn add ${packages}`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

module.exports ={
  yarnAdd
}