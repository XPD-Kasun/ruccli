const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const tar = require('tar');
const { promisify } = require('util');

const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);

async function compilePackages() {

       let packages = [
              'basic-js',
              'basic-ts'
       ];

       let types = [
              "cra",
              "slim"
       ];

       let packageSourcePath = path.join(__dirname, '../package-sources');
       let packagesPath = path.join(__dirname, '../packages');

       for (let pkg of packages) {

              let packagePath = path.join(packageSourcePath, pkg);

              for (let type of types) {

                     let source = path.join(packagePath, type);
                     let targetFolder = path.join(packagesPath, pkg);
                     let targetFile = path.join(targetFolder, type);

                     if (!fs.existsSync(targetFolder)) {
                            await mkdirAsync(targetFolder);
                     }

                     let packageContent = await readdirAsync(source);

                     await tar.create({
                            cwd: source,
                            file: targetFile,
                     }, [...packageContent]);

                     await tar.update({
                            file: targetFile,
                            cwd: packagePath
                     }, ['src', 'public']);

                     let gzip = zlib.createGzip();
                     let inputStream = fs.createReadStream(targetFile);
                     let outputStream = fs.createWriteStream(path.join(targetFolder, type + '.tgz'));
                     
                     let zipStream = inputStream.pipe(gzip).pipe(outputStream);
                     let promise = new Promise((res) => {

                            zipStream.on('finish', () => {

                                   fs.rmSync(targetFile);
                                   res();
       
                            });
                     })

                     await promise;

              }

       }
}

module.exports = compilePackages;