const chalk = require("chalk");
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const {readFile, readdir} = require('fs/promises');

const write = promisify(fs.write);
const open = promisify(fs.open);
const close = promisify(fs.close);

const getChalkText = (text, type) => {

       let matchedNumber = type.match(/[\d]+/);
       let length = 0;
       let padding = '';

       if (matchedNumber && matchedNumber.length > 0) {
              length = parseInt(matchedNumber[0])
       }

       if (!isNaN(padding)) {
              padding = ''.padStart(length - text.length);
       }

       if (type.indexOf('cd') > -1) {
              return chalk.blueBright.bold(text) + padding;
       }
       if (type.indexOf('bold') > -1) {
              return chalk.magentaBright.bold(text) + padding;
       }
       if (type.indexOf('topic') > -1) {
              return chalk.greenBright.bold(text) + padding;
       }
       if (type.indexOf('param') > -1) {
              return chalk.yellowBright.bold(text) + padding;
       }
       return chalk.white.bgCyanBright(text) + padding;

}

const compileText = async (src, dest) => {

       try {
              let fileContent = (await readFile(src)).toString('utf-8');
              let matches = fileContent.matchAll(/{((?:[\w\s\[\]<>\-$])*)}\((\w*)\)/g);

              let fd = await open(dest, 'w+');

              let prevIndex = 0;

              for (let match of matches) {
                     let strMsg = fileContent.substring(prevIndex, match.index);
                     prevIndex = match[0].length + match.index;

                     await write(fd, strMsg);

                     let chalkText = getChalkText(match[1], match[2]);
                     await write(fd, chalkText);
              }

              await write(fd, fileContent.substring(prevIndex));
              fs.closeSync(fd);
       }
       catch (error) {
              console.error(error);
       }

};

const compileTexts = async (sourceDir, destDir) => {

       let paths = await readdir(sourceDir);
       for (let file of paths) {
              await compileText(path.join(sourceDir, file), path.join(destDir, file));
       }
}

module.exports = { compileText, compileTexts };