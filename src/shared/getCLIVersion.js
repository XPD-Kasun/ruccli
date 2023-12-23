import path from 'path';
import fs from 'fs';

export default function getCLIVersion() {

       const packageJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json')));
       return packageJSON.version;       

}