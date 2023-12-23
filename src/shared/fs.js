import fs from 'fs';
import promisfy from "./promisfy.js";

export const open = promisfy(fs.open);
export const write = promisfy(fs.write);
export const read = promisfy(fs.read);
export const close = promisfy(fs.close);
export const readFile = promisfy(fs.readFile);
export const writeFile = promisfy(fs.writeFile);
export const readDir = promisfy(fs.readdir);
export const access = promisfy(fs.access);
export const stat = promisfy(fs.stat);
export const copyFile = promisfy(fs.copyFile);
export const cp = promisfy(fs.cp);
export const mkdir = promisfy(fs.mkdir);
export const rmdir = promisfy(fs.rmdir);
export const rm = promisfy(fs.rm)

export const fileExists = async (path) => {

       try {
              let stats = await stat(path);
              return true;
       }
       catch (e) {
              return false;
       }


}

export const syncdir = async (path) => {

       return new Promise((res, rej) => {

              fs.mkdir(path, { recursive: true }, (err) => {

                     if (err) {

                            if (err.code === 'EEXIST') {
                                   res(true);
                            }
                            else {
                                   res(false);
                            }
                     }
                     else {
                            res(true);
                     }

              });
       });


};
