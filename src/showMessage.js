import path from 'path';
import fs from 'fs';

const packageJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

let slogan = `
    ____  _________   ____________
   / __ \\/ ____/   | / ____/_  __/
  / /_/ / __/ / /| |/ /     / /
 / _, _/ /___/ ___ / /___  / /
/_/_|_/_____/_/__|_\\____/ /_/ 
  / / / / __ )/ ____/ __ \\ 
 / / / / __  / __/ / /_/ /
/ /_/ / /_/ / /___/ _, _/
\\____/_____/_____/_/_|_|__ ____  __    ______
  / ____/ __ \\/ | / / ___// __ \\/ /   / ____/
 / /   / / / /  |/ /\__ \/ / / / / /   / /__/
/ /___/ /_/ / /|  /___/ / /_/ / /___/ /___
\\____/\\____/_/ |_//____/\\____/_____/_____/
`;

slogan += `\nReact Uber Console CLI v ${packageJSON.version}\n`;
const DIR = path.resolve(__dirname, '../msgs');

const showMessage = (msgFile, ...args) => {

       try {
              if(args.length == 0) {
                     let stream = fs.createReadStream(path.join(DIR, msgFile), 'ascii');
                     stream.pipe(process.stdout);
                     return;
              }
              let msgContent = fs.readFileSync(path.join(DIR, msgFile)).toString('ascii');
              
              for(let i = 0; i<args.length; i++) {
                     msgContent = msgContent.replace(`{${i}}`, args[i]);
              }
              console.log(msgContent);
       }
       catch (e) {
              console.log('Could not load the help file for this command');
       }
}

export default showMessage;
export {slogan};