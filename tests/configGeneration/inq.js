import path from 'path';
import { rootFolder } from '../config.js';
import * as fs from '../../src/shared/fs.js';
import * as utils from '../../src/configGeneration/utils.js';
import writeModuleConfig from '../../src/configGeneration/ModuleWriter.js';
import syncModules from '../../src/configGeneration/generateModuleConfig.js';
import config from './artifacts/inputConfig.js';
import targetModuleConfig from './artifacts/targetModuleConfig.js';
import targetUpdatedInputConfig from './artifacts/targetUpdatedInputConfig.js';

function delay(time) {
       return new Promise((res, rej) => {
              setTimeout(() => {
                     res();
              }, time);
       });
}

jest.mock('../../src/configGeneration/writeModuleConfig.js')

describe('generates correct moduleMetaConfig', () => {

       beforeEach(async () => {

              let moduleFolder = path.join(rootFolder, 'modules');

              let exists = await fs.fileExists(moduleFolder);
              if (exists) {
                     await fs.rm(moduleFolder, { recursive: true });
              }
              await delay(1000);
              await fs.mkdir(moduleFolder);
       });

       beforeAll(() => {
              process.chdir(rootFolder);
       });

       test('creates submodule folders', async () => {

              await syncModules(config);

              let hasSearchCustomerFolderCreated = await fs.fileExists(path.join(rootFolder, 'modules/billing/searchCustomers'));
              let hasPaymentFolderCreated = await fs.fileExists(path.join(rootFolder, 'modules/billing/payment'));
              let hasNewConnectionFolderCreated = await fs.fileExists(path.join(rootFolder, 'modules/newConnections/newApplication'));
              let hasESTDFolderCreated = await fs.fileExists(path.join(rootFolder, 'modules/newConnections/eSTDItems'));

              expect(hasSearchCustomerFolderCreated).toBeTruthy();
              expect(hasPaymentFolderCreated).toBeTruthy();
              expect(hasNewConnectionFolderCreated).toBeTruthy();
              expect(hasESTDFolderCreated).toBeTruthy();

       });

       test('creates files when ts', async () => {

              config.isTs = true;
              jest.spyOn(utils, "getProjectLanguage").mockReturnValue('.ts');

              await syncModules(config);

              let hasSearchCustomerIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/billing/searchCustomers/index.ts'));
              let hasPaymentIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/billing/payment/index.ts'));
              let hasNewConnectionIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/newConnections/newApplication/index.ts'));
              let hasESTDIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/newConnections/eSTDItems/index.ts'));

              expect(hasSearchCustomerIndexCreated).toBeTruthy();
              expect(hasPaymentIndexCreated).toBeTruthy();
              expect(hasNewConnectionIndexCreated).toBeTruthy();
              expect(hasESTDIndexCreated).toBeTruthy();

       })

       test('creates files when js', async () => {

              config.isTs = false;
              jest.spyOn(utils, "getProjectLanguage").mockReturnValue('.js');

              await syncModules(config);

              let hasSearchCustomerIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/billing/searchCustomers/index.js'));
              let hasPaymentIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/billing/payment/index.js'));
              let hasNewConnectionIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/newConnections/newApplication/index.js'));
              let hasESTDIndexCreated = await fs.fileExists(path.join(rootFolder, 'modules/newConnections/eSTDItems/index.js'));

              expect(hasSearchCustomerIndexCreated).toBeTruthy();
              expect(hasPaymentIndexCreated).toBeTruthy();
              expect(hasNewConnectionIndexCreated).toBeTruthy();
              expect(hasESTDIndexCreated).toBeTruthy();

       });

       test('calls writeModuleConfig correctly', async () => {


              await syncModules(config);

              expect(writeModuleConfig).toHaveBeenCalledWith(targetModuleConfig, targetUpdatedInputConfig);


       });





});