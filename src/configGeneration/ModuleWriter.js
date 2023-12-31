import path from 'path';
import { open, write, close, writeFile, fileExists, mkdir } from "../shared/fs.js";
import getCLIVersion from '../shared/getCLIVersion.js';
import { createReactSkeleton, getModuleId, getProjectLanguage } from './utils.js';

export default class ModuleWriter {

       moduleConfig = null;
       moduleFolder = '';

       constructor(moduleConfig, moduleFolder) {

              if (!moduleConfig || !moduleFolder) {
                     throw new Error('moduleConfig and moduleFolder cannot be empty');
              }

              this.moduleConfig = moduleConfig;
              this.moduleFolder = moduleFolder;
       }

       async writeModuleConfig(splitFiles) {

              if (!await fileExists(this.moduleFolder)) {
                     await mkdir(this.moduleFolder);
              }

              if (splitFiles) {
                     await this.writeSplitConfig();
              }
              else {
                     await this.writeSingleConfig();
              }

       }

       async writeSplitConfig() {

              let version = getCLIVersion();
              let ext = await getProjectLanguage(true);

              const moduleConfigFileName = 'moduleConfig' + ext;
              let mainConfigFd = null;

              try {
                     mainConfigFd = await open(path.resolve(this.moduleFolder, moduleConfigFileName), 'w+');
                     await write(mainConfigFd, "/* Generated By create-uber-console(" + version + ") */\n");

                     if (this.moduleConfig.moduleErrorComponent) {

                            let str = "import {lazy} from 'react';\nimport ErrorComponent from './ErrorComponent';\n";
                            await write(mainConfigFd, str);
                     }

                     let moduleNames = [];

                     for (let m of this.moduleConfig.modules) {
                            let moduleFolderName = m.id;
                            let moduleCodeFileName = m.id + 'Config';
                            await write(mainConfigFd, `import ${moduleCodeFileName} from './${moduleFolderName}/${moduleCodeFileName}';\n`);
                            moduleNames.push(moduleCodeFileName);
                     }

                     let moduleConfigCode = [
                            "\nlet moduleConfig = {\n",
                            `\tappName: "${this.moduleConfig.appName}",\n`,
                            `\trootPath: "${this.moduleConfig.rootPath}",\n`,
                            `\tmodules: [\n\t\t${moduleNames.join(',\n\t\t')}\n\t]\n`,
                            "};"
                     ];

                     if (this.moduleConfig.moduleErrorComponent) {
                            let moduleErrorComponent = `\tmoduleErrorComponent: ErrorComponent,\n`;
                            moduleConfigCode.splice(3, 0, moduleErrorComponent);
                            await createReactSkeleton(
                                   path.join(this.moduleFolder, "ErrorComponent" + ext),
                                   "ErrorComponent",
                                   "page-container",
                                   `<div className="page-title">Something went wrong</div><p>We are working to fix the problem.</p>`
                            );
                     }

                     moduleConfigCode.forEach(async (item) => {
                            await write(mainConfigFd, item);
                     });

                     await write(mainConfigFd, '\n\nexport default moduleConfig;');

              }
              finally {
                     if (mainConfigFd) {
                            await close(mainConfigFd);
                     }

              }

              for (let m of this.moduleConfig.modules) {
                     await this.writeSplitModule(m);
              }

       }

       async writeSingleConfig() {

              let version = getCLIVersion();
              let ext = await getProjectLanguage(true);

              const moduleConfigFileName = 'moduleConfig' + ext;
              let mainConfigFd = null;

              try {
                     mainConfigFd = await open(path.resolve(this.moduleFolder, moduleConfigFileName), 'w+');
                     await write(mainConfigFd, "/* Generated By create-uber-console(" + version + ") */\n");

                     if (this.moduleConfig.moduleErrorComponent) {

                            let str = "import {lazy} from 'react';\nimport ErrorComponent from './ErrorComponent';\n";
                            await write(mainConfigFd, str);
                     }

                     let moduleConfigCode = [
                            "\nlet moduleConfig = {\n",
                            `\tappName: "${this.moduleConfig.appName}",\n`,
                            `\trootPath: "${this.moduleConfig.rootPath}",\n`,
                            "\tmodules: [\n"
                     ];

                     let moduleStrings = [];

                     for (let module of this.moduleConfig.modules) {

                            let {
                                   targetModuleFolderName,
                                   targetModuleFolderPath,
                                   language,
                                   moduleString
                            } = await this.writeModuleContent(module, false);              

                            moduleStrings.push(moduleString);
                     }

                     if (this.moduleConfig.moduleErrorComponent) {
                            let moduleErrorComponent = `\tmoduleErrorComponent: ErrorComponent,\n`;
                            moduleConfigCode.splice(3, 0, moduleErrorComponent);
                            await createReactSkeleton(
                                   path.join(this.moduleFolder, "ErrorComponent" + ext),
                                   "ErrorComponent",
                                   "page-container",
                                   `<div className="page-title">Something went wrong</div><p>We are working to fix the problem.</p>`
                            );
                     }

                     moduleConfigCode.forEach(async (item) => {
                            await write(mainConfigFd, item);
                     });

                     for(let m of moduleStrings) {
                            //m = m.replace('\n  ', )
                            await write(mainConfigFd, m + ',\n')
                     }

                     await write(mainConfigFd, ']};');

                     await write(mainConfigFd, '\n\nexport default moduleConfig;');

              }
              finally {
                     if (mainConfigFd) {
                            await close(mainConfigFd);
                     }

              }

       }

       async writeModuleContent(module, isSplitConfig) {

              let relativeModulePath = '';

              if(isSplitConfig) {
                     relativeModulePath = './';
              }
              else {
                     relativeModulePath = './' + getModuleId(module.name)
              }

              let targetModuleFolderName = getModuleId(module.name);
              let targetModuleFolderPath = path.resolve(this.moduleFolder, targetModuleFolderName);
              let language = await getProjectLanguage(true);

              if (!await fileExists(targetModuleFolderPath)) {
                     await mkdir(targetModuleFolderPath, { recursive: true });
              }

              if (module.layout) {

                     module.layout = `$^{${relativeModulePath}/layout${language}}`;
                     await createReactSkeleton(
                            path.join(targetModuleFolderPath, `layout${language}`),
                            `${module.name.replace(/\s/g, '')}`,
                            `${module.name.toLowerCase().replace(/\s/g, '-')}-layout`,
                            "<Outlet />",
                            [
                                   "import { Outlet } from 'react-uberconsole/router';",
                                   "import { lazy } from 'react';"
                            ])

              }

              for (let i = 0; i < module.subModules.length; i++) {

                     const subModule = module.subModules[i];

                     let subModuleFolderName = getModuleId(subModule.name);
                     let subModuleFolderPath = path.join(targetModuleFolderPath, subModuleFolderName);

                     subModule.component = `$^{${relativeModulePath}/${subModuleFolderName}}`;

                     if (!await fileExists(path.join(subModuleFolderPath))) {
                            await mkdir(subModuleFolderPath, { recursive: true });
                     }

                     let subModuleComponentName = subModule.name.replace(/\s/g, '');

                     await createReactSkeleton(
                            path.join(subModuleFolderPath, `${subModuleComponentName}${language}`),
                            subModuleComponentName,
                            `page-container`
                     );

                     await writeFile(
                            path.join(subModuleFolderPath, `index${language}`),
                            `import ${subModuleComponentName} from './${subModuleComponentName}';\n\n` +
                            `export default ${subModuleComponentName};`
                     );
              }

              let moduleStringified = JSON.stringify(module, null, 2);

              let matches = moduleStringified.matchAll(/\"\$\^\{([\w./]*)\}\"/g)

              for (let m of matches) {
                     moduleStringified = moduleStringified.replace(m[0], "lazy(() => import('" + m[1] + "'))");
              }

              return {
                     targetModuleFolderName,
                     targetModuleFolderPath,
                     language,
                     moduleString: moduleStringified
              }
       }

       async writeSplitModule(module) {

              let {
                     targetModuleFolderName,
                     targetModuleFolderPath,
                     language,
                     moduleString
              } = await this.writeModuleContent(module, true);

              let fd = null;

              try {
                     fd = await open(path.join(targetModuleFolderPath, `${targetModuleFolderName}Config${language}`), 'w+');

                     await write(fd, "import { lazy } from 'react';\n\nconst module = ");
                     await write(fd, moduleString);
                     await write(fd, "\nexport default module;");

              }
              catch (e) {
                     console.error('Something went wrong while writing the module : ', targetModuleFolderName);
                     throw e;
              }
              finally {
                     if (fd) {
                            await close(fd);
                     }
              }

       }
}
