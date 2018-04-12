const fs = require('fs');
const yarn = require('./packageInstaller');
const devPayloads = require('./devPayloads');

const dirs = ['src', 'src/client', 'src/server'];
const files = [['src/client/App.js', ''],
               ['webpack.config.js', devPayloads.webpack],
               ['.babelrc', devPayloads.babel],
               ['src/index.html', devPayloads.html],
               ['src/server/index.js', '']];
let dirsCreated = false;
let filesWritten = false;
let packagesInstalled = false;

const createDirectories = async () => {

  for (let i = 0; i < dirs.length; i+= 1) {
   await fs.mkdir(dirs[i], (err, result) => {
      if (err) {
        console.log(`Error creating ${dirs[i]} caught ${err}`);
      } else {
        console.log(`👏 😎  ${dirs[i]} created  👏 😎 `)
      }
    });
  };
  dirsCreated = true;
};

const writeFiles = () => {
  for (let i = 0; i < files.length; i+= 1) {
    fs.writeFile(files[i][0], files[i][1], (err, result) => {
      if (err) {
        console.log(`Error writing to ${files[i][0]}, caught ${err}`)
      } else {
        console.log(`📝📌 ${files[i][0]} successfully received payload 💥`)
      }
    });
  };
  filesWritten = true;
};


const installPackages = async () => {
   await yarn.yarnBall([devPayloads.devPackages, devPayloads.reactPackages]);

   packagesInstalled = true;

}

const createBoilerPlate = async () => {
  await createDirectories();
  setInterval(() => {
    if (dirsCreated && !filesWritten && packagesInstalled) {
      writeFiles();
    } else if (dirsCreated && filesWritten) {
      console.log(`🧐 Looks like I'm done here 👀 ✌️😎 \n Starting to install packages`);
      
    }
  }, 2500);
};




exports.redHarp = async () => {
  await installPackages()
  createBoilerPlate();
  setInterval(() => {
    if (dirsCreated && filesWritten && packagesInstalled) {
      process.exit();
    }
  }, 500);

}