import path from 'path';
import inquirer from 'inquirer';
import * as fs from '../../src/shared/fs.js';
import { rootFolder } from '../config';
import inquireCoreInfo from '../../src/configGeneration/inquireCoreInfo.js';

jest.mock('inquirer', () => {

       return {
              prompt: () => Promise.resolve({
                     appName: 'test',
                     rootPath: '/',
                     createModuleErrorComponent: true
              })
       }

})

describe('inquireCoreInfo', () => {

       beforeAll(() => {
              process.chdir(rootFolder);
       });

       describe('called and moduleFolder is not given', () => {

              beforeEach(async () => {

                     let modulePath = path.resolve(rootFolder, 'modules')
                     if (await fs.fileExists(modulePath)) {
                            await fs.mkdir(modulePath, {recursive: true});
                     }
              });

              test('creates correct infoModel when no src folder found', async () => {

                     let srcPath = path.resolve(rootFolder, 'src')
                     if (await fs.fileExists(srcPath)) {
                            await fs.rmdir(srcPath);
                     }

                     let infoModel = await inquireCoreInfo();

                     expect(infoModel).toMatchObject({
                            appName: 'test',
                            rootPath: '/',
                            createModuleErrorComponent: true,
                            isTs: false,
                            moduleFolderPath: path.join(rootFolder, 'modules')
                     })

              });

              test('creates correct infoModel when src folder found', async () => {

                     let srcPath = path.resolve(rootFolder, 'src')
                     if (!await fs.fileExists(srcPath)) {
                            await fs.mkdir(srcPath, {recursive: true} );
                     }

                     let infoModel = await inquireCoreInfo();

                     expect(infoModel).toMatchObject({
                            appName: 'test',
                            rootPath: '/',
                            createModuleErrorComponent: true,
                            isTs: false,
                            moduleFolderPath: path.join(rootFolder, 'src/modules')
                     })

              });

       });

       
       describe('called and moduleFolder given', () => {

              test('creates correct infoModel', async () => {

                     let suggestedPath = path.resolve(rootFolder, 'test/config');
                     if(!await fs.fileExists(suggestedPath)) {
                            await fs.mkdir(suggestedPath, {recursive: true});
                     }
                     let infoModel = await inquireCoreInfo(suggestedPath);

                     expect(infoModel).toMatchObject({
                            appName: 'test',
                            rootPath: '/',
                            createModuleErrorComponent: true,
                            isTs: false,
                            moduleFolderPath: path.join(rootFolder, 'test/config')
                     })

              });

       });


});