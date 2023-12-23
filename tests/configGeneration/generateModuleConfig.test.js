import generateModuleConfig from '../../src/configGeneration/generateModuleConfig';
import { writeFile } from '../../src/shared/fs';
import inputModuleModel from './artifacts/inputModuleModel';
import targetModuleConfig from './artifacts/targetModuleConfig';

describe('generateModuleConfig', () => {

       it('creates the correct moduleConfig', async () => {

              let inputModel = {
                     appName: 'test',
                     rootPath: '/',
                     createModuleErrorComponent: true,
                     isTs: false,
                     modules: inputModuleModel
              };

              let actualModuleConfig = await generateModuleConfig(inputModel);

              expect(actualModuleConfig).toMatchObject(targetModuleConfig);

       });

});