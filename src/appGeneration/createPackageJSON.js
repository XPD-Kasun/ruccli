import chalk from 'chalk';
import fs from 'fs';
import { stat, writeFile } from '../shared/fs.js';

export default async function createPackageJSON(path, name, obj) {

       // await new Promise((res, rej) => {
       //        setTimeout(() => res(), 5000);
       // });

       try {
              let isExists= false;
              try {
                     let accessInfo = await stat(path);
                     return {
                            error: 'There is a package.json file already. Directory is non-empty.'
                     };
              }
              catch(e) {}
              
              let packageJSON = {
                     "name": name,
                     ...obj
              };

              await writeFile(path, JSON.stringify(packageJSON, null, 5));
              
              return {
                     error: ''
              };

       }
       catch (e) {
              console.log(chalk.redBright.bold('Could\'t write package.json. '), e);
       }



}