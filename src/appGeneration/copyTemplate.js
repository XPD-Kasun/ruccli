import fs from 'fs';
import { resolve, join } from 'path';
import tar from 'tar';
import zlib from 'zlib';

export default async function copyTemplate(useSlim, language) {

       try {

              let packageFolder = 'basic-js';
              if (language === 'ts') {
                     packageFolder = 'basic-ts';
              }

              let fileName = '', tarFile = '';

              if (useSlim) {
                     fileName = join(__dirname, '../../packages', packageFolder, 'slim.tgz');
                     tarFile = join(process.cwd(), 'slim.tar');
              }
              else {
                     fileName = join(__dirname, '../../packages', packageFolder, 'cra.tgz');
                     tarFile = join(process.cwd(), 'cra.tar');
              }


              let inputStream = fs.createReadStream(fileName);
              let outputStream = fs.createWriteStream(tarFile);

              let gunzip = zlib.createGunzip();

              let unZippedStream = inputStream.pipe(gunzip).pipe(outputStream);

              let promise = new Promise((res) => {

                     unZippedStream.on('finish', async () => {

                            await tar.extract({
                                   file: tarFile
                            });

                            fs.rmSync(tarFile);

                            res();

                     });

              });

              await promise;

              return {};

       }
       catch (e) {
              return {
                     error: e
              };
       }


}