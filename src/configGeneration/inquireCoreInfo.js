import chalk from "chalk";
import path from 'path';
import { readFile, fileExists } from "../shared/fs.js";
import { getProjectLanguage } from "./utils.js";

export default async function inquireCoreInfo(moduleFolderPath) {

       const inquirer = (await import("inquirer")).default;

       let srcPath = path.join(process.cwd(), 'src');

       if (!moduleFolderPath) {

              moduleFolderPath = path.resolve(process.cwd(), 'modules');

              if (await fileExists(srcPath)) {
                     moduleFolderPath = path.join(srcPath, 'modules');
              }

              let isModulesFolderExists = await fileExists(moduleFolderPath);
              if (isModulesFolderExists) {
                     console.log(chalk.redBright('\nAn exisiting module folder detected at'), chalk.redBright.underline(moduleFolderPath), '\n');
                     return null;
              }
       }

       let packageJSONPath = path.resolve(process.cwd(), 'package.json'), data = {};
       let isPackageJSONExists = await fileExists(packageJSONPath);

       if (isPackageJSONExists) {

              data = JSON.parse(await readFile(packageJSONPath));
       }

       console.log(chalk.cyanBright.bold('This wizard will help you to create module configuration.\n'));

       let basicInfo = await inquirer.prompt([
              {
                     name: 'appName',
                     message: 'Name of the app? ',
                     type: 'input',
                     default: data.name,
                     validate: (input) => input ? true : false
              },
              {
                     name: 'rootPath',
                     message: 'Rootpath? (Url path if root of url cannot be used. Press enter if you dont want to configure.)',
                     type: 'input',
                     default: '/'
              },
              {
                     name: 'createModuleErrorComponent',
                     message: "Do you want to create the component to show on module errors?",
                     type: 'confirm',
              }
       ]);

       let isTs = await getProjectLanguage();
       basicInfo.isTs = isTs;
       basicInfo.moduleFolderPath = moduleFolderPath;

       return basicInfo;

}