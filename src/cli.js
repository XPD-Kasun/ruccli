import showMessage, {slogan} from './showMessage.js';
import appGeneration from './appGeneration/index.js';
import configGeneration from './configGeneration/index.js';

async function run(argv) {

       console.log(slogan);

       if(argv.length < 1) {
              showMessage('invalidArgumentCount.txt');
              return;
       }

       let cmd =argv[0].toLowerCase();

       if(cmd === 'app') {
              appGeneration(argv.slice(1));
              return;
       }
       else if(cmd === 'config') {
              configGeneration(argv.slice(1));
              return;
       }
       showMessage('unknownCommand.txt', cmd);

}

export { run };