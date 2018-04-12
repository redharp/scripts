const fs = require('fs');
const yarnAssist = require('./packageInstaller');
const devPayloads = require('./devPayloads');

const dirs = ['src', 'src/client', 'src/server'];
const files = [['src/client/App.js', ''],
               ['webpack.config.js', devPayloads.webpack],
               ['.babelrc', devPayloads.babel],
               ['src/index.html', devPayloads.html],
               ['src/server/index.js', '']];
let done = false;
let complete = false;
const createDirectories = () => {

  for (let i = 0; i < dirs.length; i+= 1) {
    fs.mkdir(dirs[i], (err, result) => {
      if (err) {
        console.log(`Error creating ${dirs[i]} caught ${err}`);
      } else {
        console.log(`👏 😎  ${dirs[i]} created  👏 😎 `)
      }
    });
  };
  done = true;
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
  complete = true;
};


// fs.mkdir('src', (err, result) => {
//   if (err) {
//     console.log(`Unknown fs error when trying to create src ${err}`);
//   } else {
//     fs.mkdir('src/client', (err, result) => {
//       if (err) {
//         console.log(`Unknown fs error when trying to create src ${err}`);
//       } else {
//         console.log('Done creating src/client')
//         fs.writeFile('src/client/App.js', devPayloads, (err, result) => {
//           if (err) {
//             console.log('Unknown fs error trying to create src/client/App.js');
//           } else {
//             console.log('Done creating App.js in src/client')
//           }
//         });
//       }
//     });     
//   }
// });


const installPackages = async () => {
  await yarnAssist(devPayloads.devPackages);
  await yarnAssist(devPayloads.reactPackages);
}

const createBoilerPlate = async () => {
    createDirectories();
  setInterval(() => {
    if (done && !complete) {
      writeFiles();
    } else if (done && complete) {
      console.log(`🧐 Looks like I'm done here 👀 ✌️😎 \n Starting to install packages`);
      await installPackages();
      process.exit();
    }
  }, 250);
};

createBoilerPlate();
