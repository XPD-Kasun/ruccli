import chalk from "chalk";
import url from 'url';
import path from 'path';
import inquireCoreInfo from "./inquireCoreInfo.js";
import inquireModuleInfo from "./inquireModuleInfo.js";
import generateModuleConfig from "./generateModuleConfig.js";
import ModuleWriter from "./ModuleWriter.js";

export default async function configGeneration(args) {

       const inquirer = (await import("inquirer")).default;

       let infoModel = await inquireCoreInfo();
       
       if(!infoModel) {
              return;
       }

       let modules = await inquireModuleInfo();
       let split = await inquirer.prompt([
              {
                     name: 'configSplitToFiles',
                     message: 'Split the configuration to files (By splitting configuration will be splitted to multiple configuration files across modules. If not, a single configuration file will be created) ?',
                     type: 'confirm'
              }
       ]);

       infoModel.splitFiles = split.configSplitToFiles;
       infoModel.modules = modules;

       let moduleConfig = await generateModuleConfig(infoModel);

       console.log(chalk.cyanBright.bold("Generating Module Configuration"));
       
       const moduleWriter = new ModuleWriter(moduleConfig, infoModel.moduleFolderPath);

       console.log(chalk.cyanBright.bold("Writing module configuration to the disk"));

       await moduleWriter.writeModuleConfig(infoModel.splitFiles);

       console.log(chalk.greenBright.bold("\nModule Configuration was written. Please reformat the indentation of the generated config if needed using your editor.\n"));
}

