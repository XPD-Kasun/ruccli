import os from 'os';
import path from 'path';
import listr from 'listr';
import getOptions from './getOptions.js';
import createPackageJSON from './createPackageJSON.js';
import getAppPackageObject from './getAppPackageObject.js';
import copyTemplate from './copyTemplate.js';
import runPackageManager from './runPackageManager.js';
import chalk from 'chalk';
import configGeneration from '../configGeneration/index.js';
import clearScreen from '../shared/clearScreen.js';
import { fileExists, rm } from '../shared/fs.js';

function delay(val) {
       return new Promise((res) => {
              setTimeout(() => {
                     res();
              }, 5000);
       });
}

function promiseMachine() {

       let res;

       let promise = new Promise((resolve) => {
              res = resolve;
       })

       return {
              resolve: res,
              promise
       };
}

async function appGeneration(args) {

       let options = await getOptions(args);

       let {resolve, promise} = promiseMachine();

       let tasks = new listr([
              {
                     title: 'Getting package.json config',
                     task: (ctx, task) => {
                            ctx.packageJSON = getAppPackageObject(options.appName, options.language, options.useSlim);
                     }
              },
              {
                     title: 'Creating package.json at ' + process.cwd(),
                     task: async (ctx, task) => {

                            let result = await createPackageJSON(
                                   path.resolve(process.cwd(), 'package.json'),
                                   options.appName,
                                   ctx.packageJSON
                            );

                            if (result.error) {
                                   throw new Error(result.error);
                                   //task.report(new Error(result.error));
                            }
                     }
              },
              {
                     title: 'Copying Files',
                     task: async (ctx, task) => {

                            let result = await copyTemplate(options.useSlim, options.language);

                            if (result.error) {
                                   throw new Error(result.error);
                            }

                     }
              }
       ], {
              exitOnError: true,
       });

       console.log(chalk.cyan.bold('\nCreating Your React-UberConsole App...\n'));

       try {
              await tasks.run({});

              console.log(chalk.cyan.bold('\nInstalling Dependencies (this might take few moments)\n'));
              let childProcess = await runPackageManager(options.package);
              await childProcess;

              if (options.callWizard) {
                     clearScreen();
                     console.log('');
                     if(await fileExists(path.join(process.cwd(), 'src/modules'))) {
                            await rm(path.join(process.cwd(), 'src/modules'), {recursive: true});
                     }
                     await configGeneration(args);
              }

              console.log('\n\tInstallation complete. Now you can run the application by');
              console.log('\t' + chalk.cyan.bold('yarn start') + ' or ' + chalk.cyan.bold('npm start'));
              console.log('\n');
       }
       catch (e) {
              console.log(chalk.redBright.underline("\n\nCouldn't create the app. Following error occured\n"));
              console.log(e.message, '\n');
       }





}



export default appGeneration;
