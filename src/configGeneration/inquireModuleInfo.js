import chalk from "chalk";
import url from 'url';
import path, { normalize } from 'path';
import { getModuleId } from "./utils.js";

const requried = (name) => name ? true : false;

export default async function createModules() {

       const inquirer = (await import("inquirer")).default;

       let hasMoreModules = true, modules = [];

       while(hasMoreModules) {

              console.log("\nLet's start adding module list\n");

              let module = await inquirer.prompt([
                     {
                            name: 'name',
                            message: 'Module Name? ',
                            validate: requried,
                            type: 'input'
                     },
                     {
                            name: 'path',
                            message: 'Module Path (eg: /mymodule)?',
                            type: 'input',
                            validate: requried,
                            default: function(answers) {
                                   return '/' + answers.name;
                            }
                     },
                     {
                            name: 'hasLayout',
                            message: "Does this module has a layout?",
                            type: "confirm",
                            default: false
                     }
              ]);

              console.log("\nLet's add submodules for '"+ module.name +"'.\n");

              let hasMoreSubmodules = true, subModules = [];

              while (hasMoreSubmodules) {

                     let subModule = await inquirer.prompt([
                            {
                                   name: 'name',
                                   message: 'Submodule name ?',
                                   type: 'input',
                                   validate: requried,
                            },
                            {
                                   name: 'path',
                                   message: 'Path for this submodule ?',
                                   type: 'input',
                                   validate: requried,
                                   default: function(answers) {
                                          return '/'+ answers.name;
                                   }
                            },
                            {
                                   name: 'showSidebar',
                                   message: "Show the sidebar when we are on this module [Press enter to yes] ?",
                                   type: 'confirm',
                                   default: true
                            },
                            {
                                   name: 'hasInternalRoutes',
                                   message: 'Does this submodule needs nested routes [Press enter to no]?',
                                   type: 'confirm',
                                   default: false
                            },
                            {
                                   name: 'moreSubmodules',
                                   message: 'Do you want to add another submodule ?',
                                   type: 'confirm',
                                   default: false
                            }
                     ]);

                     subModules.push(subModule);
                     console.log(' ');

                     hasMoreSubmodules = subModule.moreSubmodules;
                     delete subModule.moreSubmodules;

              }

              let hasMoreLinks = true, sidebarItems = [];
              console.log("\nLet's add sidebar items for this module\n");

              while (hasMoreLinks) {

                     let sidebarItem = await inquirer.prompt([
                            {
                                   name: 'text',
                                   message: 'Sidebar link text?',
                                   type: 'input',
                                   validate: requried
                            },
                            {
                                   name: 'type',
                                   message: 'Select the sidebar link type',
                                   type: 'list',
                                   choices: [
                                          { name: 'Group of links', value: 'group' },
                                          { name: 'Link to a submodule', value: 'subModuleLink' },
                                          { name: 'General URL', value: 'url' },
                                   ]
                            },
                            {
                                   name: 'url',
                                   messge: 'URL to link?',
                                   type: 'input',
                                   validate: requried,
                                   when: (answers) => {
                                          return answers.type === 'url';
                                   }
                            },
                            {
                                   name: 'subModuleId',
                                   message: 'Select submodule for this link',
                                   type: 'list',
                                   choices: subModules.map(subModule => ({
                                          name: subModule.name,
                                          value: getModuleId(subModule.name)
                                   })),
                                   when: (answers) => {
                                          return answers.type === 'subModuleLink';
                                   }
                            }

                     ]);


                     if(sidebarItem.type === 'group') {
                            
                            let hasMoreGroupItems = true;
                            sidebarItem.items = [];
                            console.log("\nLet's add sidebar items to this group\n");

                            while(hasMoreGroupItems) {

                                   let groupItem = await inquirer.prompt([
                                          {
                                                 name: 'text',
                                                 message: '[Group - '+ sidebarItem.text + '] Sidebar link text ?',
                                                 type: 'input',
                                                 validate: requried
                                          },
                                          {
                                                 name: 'type',
                                                 message: '[Group - '+ sidebarItem.text + '] Select the sidebar link type',
                                                 type: 'list',
                                                 choices: [
                                                        { name: 'Link to a submodule', value: 'subModuleLink' },
                                                        { name: 'General URL', value: 'url' }
                                                 ]
                                          },
                                          {
                                                 name: 'url',
                                                 validate: requried,
                                                 messge: '[Group - '+ sidebarItem.text + '] URL to link?',
                                                 type: 'input',
                                                 when: (answers) => {
                                                        return answers.type === 'url';
                                                 }
                                          },
                                          {
                                                 name: 'subModuleId',
                                                 message: '[Group - '+ sidebarItem.text + '] Select submodule for this link',
                                                 type: 'list',
                                                 choices: subModules.map(subModule => ({
                                                        name: subModule.name,
                                                        value: getModuleId(subModule.name)
                                                 })),
                                                 when: (answers) => {
                                                        return answers.type === 'subModuleLink';
                                                 }
                                          },
                                          {
                                                 name: 'needMoreGroupItems',
                                                 message: "[Group - "+ sidebarItem.text + "] Do you need to add another sidebar group item?",
                                                 type: "confirm",
                                                 default: false
                                          }
              
                                   ]);
                                   
                                   sidebarItem.items.push(groupItem);
                                   hasMoreGroupItems = groupItem.needMoreGroupItems;
                                   delete groupItem.needMoreGroupItems;

                                   console.log(' ');

                            }

                     }

                     let needMoreLinks = await inquirer.prompt([
                            {
                                   name: 'needMore',
                                   message: 'Do you need to add another sidebar item?',
                                   type: 'confirm',
                                   default: false

                            }
                     ]);

                     hasMoreLinks = needMoreLinks.needMore;
                     sidebarItems.push(sidebarItem);                     
                     
                     console.log(' ');

              }

              module.subModules = subModules;
              module.sidebarItems = sidebarItems;
              modules.push(module);

              let needMoreModules = await inquirer.prompt([
                     {
                            name: 'needMore',
                            message: 'Do you need another module?',
                            type: 'confirm',
                            default: false
                     }
              ]);

              hasMoreModules = needMoreModules.needMore;

              console.log(' ');
       }

       
       return modules;
}