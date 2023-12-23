const path = require('path');
const { compileTexts } = require('./compileMessages.js');
const compilePackages = require("./compilePackages");

let src = path.resolve(__dirname, '../texts');
let dest = path.resolve(__dirname, '../msgs');

async function run() {
 
       await compileTexts(
              src,
              dest,
       );

       await compilePackages();
}

run();