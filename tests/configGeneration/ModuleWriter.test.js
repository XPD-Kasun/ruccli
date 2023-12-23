import path from 'path';
import ModuleWriter from '../../src/configGeneration/ModuleWriter.js';
import * as fs from '../../src/shared/fs.js';
import { rootFolder } from '../config.js';
import targetModuleConfig from './artifacts/targetModuleConfig';
import * as utils from '../../src/configGeneration/utils';

describe('writes config correcly', () => {

       let moduleFolder = path.join(rootFolder, 'modules');

       beforeEach(async () => {

              process.chdir(rootFolder);

              if (await fs.fileExists(moduleFolder)) {
                     await fs.rmdir(moduleFolder, { recursive: true });
              }
              await fs.mkdir(moduleFolder, { recursive: true });
       });

       describe('when splitFiles is true', () => {


              test('exists config files', async () => {

                     jest.spyOn(utils, 'getProjectLanguage').mockImplementation(() => '.js');

                     let moduleWriter = new ModuleWriter(targetModuleConfig, moduleFolder);
                     await moduleWriter.writeModuleConfig(true);

                     let isModuleFileExists = await fs.fileExists(path.resolve(moduleFolder, 'moduleConfig.js'));
                     let isBillingConfigExists = await fs.fileExists(path.join(moduleFolder, 'billing', 'billingConfig.js'));
                     let isNewConnectionConfigExists = await fs.fileExists(path.join(moduleFolder, 'newConnections', 'newConnectionsConfig.js'));

                     expect(isModuleFileExists).toBe(true);
                     expect(isBillingConfigExists).toBe(true);
                     expect(isNewConnectionConfigExists).toBe(true);

              });
       })

});