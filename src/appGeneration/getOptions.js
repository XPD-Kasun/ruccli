import arg from "arg";
import chalk from "chalk";

const requried = (name) => name ? true : false;

export default async function getOptions(args) {

       let inquirer = await import("inquirer");
       inquirer = inquirer.default;

       let parsedArgs = arg({
              '--pkg': String,
              '--lang': String,
              '-p': '--pkg',
              '-l': '--lang',
              '--use-slim': arg.COUNT
       });

       let options = {
              appName: '',
              package: parsedArgs['--pkg'] || 'npm',
              language: parsedArgs['--lang'] || 'js',
              useSlim: (parsedArgs['--use-slim'] > 0),
              callWizard: true
       };

       let answer = await inquirer.prompt({
              name: 'appName',
              type: 'input',
              message: 'What is the name of your app (Should honor npm naming rules)?',
              validate: requried
       });
       if (!answer.appName) {
              console.log(chalk.redBright.bold('You haven\'t provided a name for the app'));
              return;
       }
       
       options.appName = answer.appName;

       let callModuleConfigWizard = await inquirer.prompt({
              name: 'call',
              type: 'confirm',
              message: 'Would you like to start the configuration wizard after installing the app ?',
              default: true
       });

       options.callWizard = callModuleConfigWizard.call;

       return options;
}