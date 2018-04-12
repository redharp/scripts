const util = require('util');
const exec = util.promisify(require('child_process').exec);

const devPackages = `--dev webpack webpack-cli html-loader babel-preset-env babel-plugin-transform-class-properties babel-core babel-loader style-loader css-loader html-webpack-plugin babel-preset-react babel-polyfill`;
const reactPackages = 'react react-dom';
async function init() {
  const { stdout, stderr } = await exec(`yarn init -y`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
async function yarnAdd(packages) {
  const { stdout, stderr } = await exec(`yarn add ${packages}`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

async function yarnBall(packages) {
  await init()
  for (const package of packages) {
    yarnAdd(package);
  }
}

module.exports ={
  yarnBall
}