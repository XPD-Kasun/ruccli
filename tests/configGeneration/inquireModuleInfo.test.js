import inquireModuleInfo from '../../src/configGeneration/inquireModuleInfo.js';
import {stdin} from 'mock-stdin';
import writeAnswers from '../writeAnswers.js';
import inputModuleModel from './artifacts/inputModuleModel.js';

describe('inquireModuleInfo', () => {


       test('correctly creates input model object for given inputs', async () => {

              let stdIn = stdin();             

              let targetConfig = inputModuleModel;

              process.nextTick(()=> {

                     let answers = [
                            'billing',
                            '',
                            'y',
                            'search customers',
                            '', '', '', 'y',
                            'payment',
                            '', '', '', 'n',
                            'Billing',
                            '',
                            'Search Customers', '', '', 'y',
                            'Payment', '', '\x1B\x5B\x42', 'adf', /* \x1B\x5B\x42 arrow down */
                            'y',
                            'External Link',
                            '\x1B\x5B\x42\x1B\x5B\x42', 'http://google.com', 'n', 
                            'y', //new module
                            'new connections',
                            '',
                            'n',
                            'New Application',
                            '/New application', '', 'y', 'y',
                            'estditems',
                            '/ESTDItems', '', '', 'n',
                            'New Connections',
                            '',
                            'New Application', '/New application', '', 'y',
                            'ESTD Items', '', '\x1B\x5B\x42', 'n', /* \x1B\x5B\x42 arrow down */
                            'y',
                            'External Link 2',
                            '\x1B\x5B\x42\x1B\x5B\x42', 'http://test.com',
                            '', 'n' //another module
                     ]
                     writeAnswers(stdIn, answers);
              });

              const moduleInfo = await inquireModuleInfo();

              expect(moduleInfo).toMatchObject(targetConfig);

       }, 20000);
});